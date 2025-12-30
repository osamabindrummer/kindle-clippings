#!/usr/bin/env python3

"""
Extrae subrayados de "My Clippings.txt" y genera un Markdown por libro.
Salida por defecto: ~/Desktop/destacados-kindle
"""

import argparse
import os
import re
import sys

NOTE_SEPARATOR = "=========="
HIGHLIGHT_PATTERN = re.compile(r"\bhighlight\b|\bsubrayad", re.IGNORECASE)
DATE_PATTERN = re.compile("(?:Added on|A\\u00f1adido el)\\s+(.+)$", re.IGNORECASE)
CHAPTER_PATTERN = re.compile(r"\b(?:chapter|cap[ií]tulo)\s+([^|]+)", re.IGNORECASE)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Extrae subrayados de Kindle y genera Markdown por libro."
    )
    parser.add_argument(
        "input_file",
        nargs="?",
        default="My Clippings.txt",
        help="Ruta al archivo My Clippings.txt (por defecto: ./My Clippings.txt)",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="~/Desktop/destacados-kindle",
        help="Directorio de salida (por defecto: ~/Desktop/destacados-kindle)",
    )
    return parser.parse_args()


def parse_title_line(line):
    line = line.lstrip("\ufeff")
    match = re.match(r"^(.*)\s+\((.*)\)\s*$", line)
    if match:
        title = match.group(1).strip()
        author = match.group(2).strip() or "Unknown"
        return title, author
    return line.strip(), "Unknown"


def extract_date(meta_line):
    for part in re.split(r"\s*\|\s*", meta_line):
        match = DATE_PATTERN.search(part)
        if match:
            return match.group(1).strip()
    return ""


def extract_chapter(meta_line):
    for part in re.split(r"\s*\|\s*", meta_line):
        match = CHAPTER_PATTERN.search(part)
        if match:
            return match.group(1).strip()
    return ""


def is_highlight(meta_line):
    return HIGHLIGHT_PATTERN.search(meta_line) is not None


def sanitize_filename(name):
    name = re.sub(r"[\\/:*?\"<>|]", "", name)
    name = re.sub(r"\s+", " ", name)
    return name.strip()


def parse_clippings(text):
    books = {}

    for raw_block in text.split(NOTE_SEPARATOR):
        block = raw_block.strip()
        if not block:
            continue
        lines = [line.strip() for line in block.splitlines()]
        if len(lines) < 3:
            continue

        title_line = lines[0]
        meta_line = lines[1]
        if not is_highlight(meta_line):
            continue

        title, author = parse_title_line(title_line)
        date = extract_date(meta_line)
        chapter = extract_chapter(meta_line)
        highlight_text = "\n".join([line for line in lines[2:] if line])
        if not highlight_text:
            continue

        key = f"{title}||{author}"
        if key not in books:
            books[key] = {"title": title, "author": author, "highlights": []}
        books[key]["highlights"].append(
            {"text": highlight_text, "date": date, "chapter": chapter}
        )

    return list(books.values())


def build_markdown(book):
    lines = [
        f"# {book['title']}",
        "",
        "---",
        f"Autor: {book['author']}",
        "Formato: Kindle",
        "---",
        "",
    ]
    last_chapter = None
    for highlight in book["highlights"]:
        if highlight["chapter"]:
            chapter_label = f"Capítulo {highlight['chapter']}"
            if chapter_label != last_chapter:
                lines.append(f"## {chapter_label}")
                lines.append("")
                last_chapter = chapter_label
        lines.append(highlight["text"])
        lines.append("")
    lines.append("")
    return "\n".join(lines)


def main():
    args = parse_args()
    infile = args.input_file
    outdir = os.path.expanduser(args.output)

    if not os.path.isfile(infile):
        print('No se encontro "My Clippings.txt" en la ruta indicada.')
        sys.exit(1)

    os.makedirs(outdir, exist_ok=True)

    with open(infile, "r", encoding="utf-8-sig", errors="ignore") as handle:
        content = handle.read()

    books = parse_clippings(content)
    if not books:
        print("No se encontraron subrayados para exportar.")
        return

    for book in books:
        filename = f"{book['title']} ({book['author']}).md"
        filename = sanitize_filename(filename)
        outfile = os.path.join(outdir, filename)
        markdown = build_markdown(book)
        with open(outfile, "w", encoding="utf-8") as handle:
            handle.write(markdown)

    print(f"Exportados {len(books)} libros a {outdir}")


if __name__ == "__main__":
    main()
