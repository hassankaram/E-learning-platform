from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

def generate_certificate(student_name, course_title, completion_date):
    buffer = BytesIO()

    p = canvas.Canvas(buffer, pagesize=letter)

    p.setFont("Helvetica", 24)
    p.drawString(100, 700, f"Certificate of Completion")
    p.setFont("Helvetica", 18)
    p.drawString(100, 650, f"This certifies that")
    p.setFont("Helvetica", 22)
    p.drawString(100, 600, f"{student_name}")
    p.setFont("Helvetica", 18)
    p.drawString(100, 550, f"Has successfully completed the course")
    p.setFont("Helvetica", 20)
    p.drawString(100, 500, f"{course_title}")
    p.setFont("Helvetica", 14)
    p.drawString(100, 450, f"Completion Date: {completion_date.strftime('%B %d, %Y')}")

    p.showPage()
    p.save()

    buffer.seek(0)

    return buffer
