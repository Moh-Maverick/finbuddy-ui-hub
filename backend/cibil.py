# cibil.py

import re
import fitz  # PyMuPDF
from typing import Dict, Union
import io

def extract_cibil_score_from_text(text: str) -> Dict[str, Union[int, str, str]]:
    """
    Extracts a CIBIL score from a string using regex.
    Tries multiple common CIBIL report formats.
    """
    print("\n=== Analyzing extracted text ===")
    print(f"Text length: {len(text)} characters")
    print("First 200 characters of text:", text[:200], "...")
    
    # Common patterns found in CIBIL reports
    patterns = [
        r'Your\s*CIBIL\s*Score\s*is\s*(\d{3})',  # Your CIBIL Score is XXX
        r'CIBIL\s*Score\s*is\s*(\d{3})',         # CIBIL Score is XXX
        r'Score\s*:\s*(\d{3})',                  # Score: XXX
        r'Score\s*is\s*(\d{3})',                 # Score is XXX
        r'(\d{3})\s*as\s*of\s*Date',            # XXX as of Date
        r'Score\s*[:\-]?\s*(\d{3})',            # Score: XXX or Score-XXX
        r'CIBIL\s*Score\s*[:\-]?\s*(\d{3})',    # CIBIL Score: XXX
    ]

    print("\nTrying patterns to find CIBIL score:")
    for pattern in patterns:
        print(f"\nChecking pattern: {pattern}")
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                score = int(match.group(1))
                print(f"Found potential score: {score}")
                if 300 <= score <= 900:
                    print(f"✅ Valid CIBIL score found: {score}")
                    return {
                        "score": score,
                        "status": "success",
                        "message": "Successfully extracted CIBIL score"
                    }
                else:
                    print(f"❌ Score {score} outside valid range (300-900)")
            except ValueError:
                print("❌ Invalid number format")
                continue
        else:
            print("❌ Pattern not found")

    # If no pattern matched, try to find any 3-digit number between 300-900
    print("\nTrying to find any valid 3-digit score...")
    numbers = re.findall(r'(\d{3})', text)
    for num in numbers:
        try:
            score = int(num)
            if 300 <= score <= 900:
                print(f"✅ Found valid score in general text: {score}")
                return {
                    "score": score,
                    "status": "success",
                    "message": "Successfully extracted CIBIL score"
                }
        except ValueError:
            continue

    print("\n❌ No valid CIBIL score found in text")
    return {
        "score": 0,
        "status": "error",
        "message": "Could not find valid CIBIL score in document. Please ensure this is a CIBIL report PDF."
    }

def parse_uploaded_file(file_storage) -> Dict[str, Union[int, str, str]]:
    """
    Extracts CIBIL score from uploaded PDF file using PyMuPDF.
    """
    print("\n=== Processing uploaded file ===")
    
    if not file_storage or not file_storage.filename:
        print("❌ No file provided")
        return {
            "score": 0,
            "status": "error",
            "message": "No file provided"
        }

    print(f"📄 Processing file: {file_storage.filename}")

    if not file_storage.filename.lower().endswith('.pdf'):
        print("❌ Not a PDF file")
        return {
            "score": 0,
            "status": "error",
            "message": "Please upload a PDF file of your CIBIL report"
        }

    try:
        # Read file content
        file_content = file_storage.read()
        file_buffer = io.BytesIO(file_content)
        print(f"📄 File size: {len(file_content)} bytes")

        # Open PDF with PyMuPDF
        try:
            pdf_document = fitz.open(stream=file_buffer, filetype="pdf")
            print(f"📄 PDF pages: {len(pdf_document)}")
            
            # First try: Look for score in first few pages
            for page_num in range(min(3, len(pdf_document))):
                print(f"\n=== Processing page {page_num + 1} ===")
                page = pdf_document[page_num]
                
                # Try different text extraction methods
                extraction_methods = [
                    ("Default", "text"),
                    ("Raw", "raw"),
                    ("Blocks", "blocks"),
                    ("Words", "words"),
                    ("HTML", "html")
                ]
                
                for method_name, method in extraction_methods:
                    print(f"\nTrying {method_name} extraction method...")
                    try:
                        if method == "raw":
                            text = page.get_text()
                        else:
                            text = page.get_text(method)
                        
                        if text.strip():
                            print(f"Got {len(text)} characters")
                            # Clean up the text
                            text = re.sub(r'\s+', ' ', text)  # Normalize whitespace
                            text = text.replace('\n', ' ')    # Remove newlines
                            
                            result = extract_cibil_score_from_text(text)
                            if result["status"] == "success":
                                pdf_document.close()
                                return result
                    except Exception as e:
                        print(f"Method failed: {str(e)}")
                        continue

            print("\n=== Score not found in first 3 pages, checking entire document ===")
            # If score not found in first pages, try full document
            full_text = ""
            for page in pdf_document:
                # Try all extraction methods
                for method_name, method in extraction_methods:
                    try:
                        if method == "raw":
                            text = page.get_text()
                        else:
                            text = page.get_text(method)
                        if text.strip():
                            full_text += text + " "
                    except:
                        continue
            
            pdf_document.close()
            
            if not full_text.strip():
                print("❌ No text could be extracted from PDF")
                return {
                    "score": 0,
                    "status": "error",
                    "message": "Could not extract text from PDF. The file might be scanned or password protected."
                }
            
            # Clean up the text
            full_text = re.sub(r'\s+', ' ', full_text)  # Normalize whitespace
            full_text = full_text.replace('\n', ' ')    # Remove newlines
            
            return extract_cibil_score_from_text(full_text)

        except fitz.FileDataError:
            print("❌ Invalid or corrupted PDF file")
            return {
                "score": 0,
                "status": "error",
                "message": "Invalid or corrupted PDF file"
            }
        except fitz.EmptyFileError:
            print("❌ Empty PDF file")
            return {
                "score": 0,
                "status": "error",
                "message": "The PDF file is empty"
            }
        except Exception as pdf_error:
            print(f"❌ PDF processing error: {str(pdf_error)}")
            return {
                "score": 0,
                "status": "error",
                "message": f"Error processing PDF: {str(pdf_error)}"
            }

    except Exception as e:
        error_msg = str(e).lower()
        if "password" in error_msg:
            print("❌ PDF is password protected")
            return {
                "score": 0,
                "status": "error",
                "message": "The PDF file is password protected. Please provide an unprotected PDF."
            }
        else:
            print(f"❌ General error: {str(e)}")
            return {
                "score": 0,
                "status": "error",
                "message": "Error processing the PDF file. Please ensure it's a valid CIBIL report."
            }
