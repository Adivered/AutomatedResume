import os, shutil
from flask import Flask, request, jsonify, send_file
import pythoncom
from docx2pdf import convert
from flask_cors import CORS
from flask_sslify import SSLify
from API.WordDocument import WordDocument
from API.Style import Style

app = Flask(__name__, static_folder="build", static_url_path="")

sslify = SSLify(app)
CORS(app)
STYLES = {
    "xsmall": Style("xsmall", font_size=7),
    "small": Style("small", font_size=9),
    "small_b": Style("small_b", font_size=9, font_bold=True),
    "normal": Style("normal", font_size=12),
    "xlarge": Style("xlarge", font_size=26, font_bold=True),
    "section": Style("section", font_size=12, font_bold=True),
    "subsection": Style("subsection", font_size=10, font_bold=True),
    "subsection_u": Style(
        "subsection_u", font_size=10, font_bold=True, font_underline=True
    ),
}


def add_styles(doc):
    for key in STYLES.keys():
        doc.add_style(STYLES[key])


def write_paragraph(
    doc,
    text,
    style,
    align=0,
    space_before=10,
    space_after=6,
    breakline=False,
    bullet=False,
    tabs=0,
):
    para = doc.add_paragraph(bullet)

    para.space_before = space_before
    para.space_after = space_after
    if align:
        para.align = align

    if tabs > 0:
        for i in range(tabs):
            para.add_tab()
    para.add_text(text, style)
    if breakline:
        para.add_break_line("bottom")


def process_para(doc, para_data):
    if "values" in para_data:
        value = para_data["values"]
        style = para_data.get("style", "")
        align = para_data.get("align", "")
        space_before = para_data.get("spaceBefore", 0)
        space_after = para_data.get("spaceAfter", 0)
        breakline = para_data.get("breakline", False)
        bullet = para_data.get("bullet", False)
        tabs = para_data.get("tabs", 0)
        if isinstance(value, dict):
            concatenated_values = process_nested_keys(value)
            for part in concatenated_values:
                if not part:
                    continue
                write_paragraph(
                    doc,
                    text=part,
                    style=style,
                    align=align,
                    space_before=space_before,
                    space_after=space_after,
                    breakline=breakline,
                    bullet=bullet,
                    tabs=tabs,
                )
        elif isinstance(value, str):
            write_paragraph(
                doc,
                text=value,
                style=style,
                align=align,
                space_before=space_before,
                space_after=space_after,
                breakline=breakline,
                bullet=bullet,
                tabs=tabs,
            )
    else:
        print("No values found for para_data:", para_data)


def process_nested_keys(values):
    paragraphs = []
    current_paragraph = ""

    for key, value in values.items():
        if isinstance(value, dict):
            if "type" in key.lower() and not value["label"]:
                return []
            if "language" in key.lower():
                lang_values = [
                    v["value"]
                    for v in value.values()
                    if "label" in v.keys()
                    and v.get("value", "")
                    and v.get("value", "") != ""
                ]

                if lang_values:
                    paragraphs.append(": ".join(lang_values))
            else:
                nested_paragraphs = process_nested_keys(value)

                current_paragraph += " ".join(nested_paragraphs) + " "
        else:
            if key and value:
                if key != "label" and key != "suggested" and key != "tabs":
                    if "skill" in key and value:
                        paragraphs.append(value)
                        current_paragraph = ""
                    elif "\n" in value:
                        paragraphs.extend(value.split("\n"))
                        current_paragraph = ""
                    else:
                        current_paragraph += value + " "

    if current_paragraph.strip():
        paragraphs.append(current_paragraph.strip())

    return paragraphs


def generate_word_document(data):
    doc_path = os.path.abspath(os.getcwd())
    my_doc = WordDocument("my_document", doc_path)
    add_styles(my_doc)

    for section_data in data.values():
        if isinstance(section_data, dict):
            for para_name, para_data in section_data.items():
                if "para" in para_name:
                    process_para(my_doc, para_data)

    my_doc.save_document()
    word_file_path = os.path.abspath("my_document.docx")
    pdf_file_path = os.path.abspath("my_resume.pdf")
    convert(word_file_path, pdf_file_path, pythoncom.CoInitialize())
    shutil.copy(pdf_file_path, os.path.abspath("public//my_resume.pdf"))
    return "my_resume.pdf"


@app.route("/api/receive_data", methods=["POST"])
def receive_data():
    try:
        data = request.get_json()
        received_data = data.get("data", None)
        if received_data is not None:
            pdf_file = generate_word_document(received_data)

            response_data = {
                "message": "Data received successfully",
                "received_data": received_data,
                "pdf_url": pdf_file,
            }
            return jsonify(response_data), 200

        else:
            return jsonify({"error": "Invalid data"}), 400

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Error processing data"}), 500


@app.route("/api/download", methods=["GET"])
def download_file():
    try:
        file_path = os.path.abspath("public//my_resume.pdf")
        filename = "my_resume.pdf"
        return send_file(file_path, as_attachment=True, download_name=filename)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Error processing data"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=False)
