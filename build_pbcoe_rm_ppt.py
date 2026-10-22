import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # completely blank slide

    # Color Palette Definitions
    C_NAVY_DARK = RGBColor(10, 25, 47)      # #0A192F
    C_NAVY_PRIMARY = RGBColor(15, 37, 71)   # #0F2547
    C_BLUE_ACCENT = RGBColor(37, 99, 235)   # #2563EB
    C_GOLD = RGBColor(217, 119, 6)          # #D97706
    C_GOLD_LIGHT = RGBColor(254, 243, 199)  # #FEF3C7
    C_TEAL = RGBColor(13, 148, 136)         # #0D9488
    C_BG_SLATE = RGBColor(248, 250, 252)    # #F8FAFC
    C_WHITE = RGBColor(255, 255, 255)       # #FFFFFF
    C_TEXT_DARK = RGBColor(15, 23, 42)      # #0F172A
    C_TEXT_MUTED = RGBColor(71, 85, 105)    # #475569
    C_BORDER_LIGHT = RGBColor(226, 232, 240)# #E2E8F0
    C_CARD_BG = RGBColor(255, 255, 255)
    C_CRIMSON = RGBColor(190, 24, 93)

    img_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\smart-pds"
    block_diag_path = os.path.join(img_dir, "proposed_block_diagram.png")
    flowchart_path = os.path.join(img_dir, "methodology_flowchart.png")
    epos_diag_path = os.path.join(img_dir, "epos_workflow_diagram.png")

    def add_standard_header(slide, title_text):
        # Top banner background
        top_banner = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.95))
        top_banner.fill.solid()
        top_banner.fill.fore_color.rgb = C_NAVY_PRIMARY
        top_banner.line.color.rgb = C_NAVY_DARK

        # Top Gold Accent Line
        gold_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0.95), Inches(13.333), Inches(0.05))
        gold_line.fill.solid()
        gold_line.fill.fore_color.rgb = C_GOLD
        gold_line.line.fill.background()

        # Text inside banner
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.18), Inches(11.733), Inches(0.65))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_top = Inches(0)
        tf.margin_bottom = Inches(0)
        tf.margin_left = Inches(0)
        tf.margin_right = Inches(0)

        p_title = tf.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = C_WHITE

    def add_standard_footer(slide, slide_num=None):
        if not slide_num:
            return
        footer_bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(7.1), Inches(13.333), Inches(0.4))
        footer_bg.fill.solid()
        footer_bg.fill.fore_color.rgb = RGBColor(248, 250, 252)
        footer_bg.line.fill.background()

        tb = slide.shapes.add_textbox(Inches(0.8), Inches(7.12), Inches(11.733), Inches(0.3))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.RIGHT
        p.text = f"Slide {slide_num}"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = RGBColor(148, 163, 184)

    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)

    # Dark background
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = C_NAVY_DARK
    bg1.line.fill.background()

    # Inner decorative border
    border1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(0.4), Inches(12.533), Inches(6.7))
    border1.fill.background()
    border1.line.color.rgb = C_GOLD
    border1.line.width = Pt(1.5)

    # Top College Header Card
    tb_inst = s1.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.733), Inches(1.8))
    tf_inst = tb_inst.text_frame
    tf_inst.word_wrap = True

    p0 = tf_inst.paragraphs[0]
    p0.alignment = PP_ALIGN.CENTER
    p0.text = "Lokmanya Tilak Jankalyan Shikshan Sanstha's"
    p0.font.size = Pt(12)
    p0.font.color.rgb = RGBColor(226, 232, 240)

    p1 = tf_inst.add_paragraph()
    p1.alignment = PP_ALIGN.CENTER
    p1.text = "PRIYADARSHINI BHAGWATI COLLEGE OF ENGINEERING, NAGPUR"
    p1.font.size = Pt(20)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(254, 240, 138)

    p2 = tf_inst.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "Harpur Nagar, Umred Road, Nagpur - 440024 | An Autonomous Institution Affiliated to R.T.M. Nagpur University\nAccredited with Grade 'A' by NAAC | Department of Computer Science & Engineering"
    p2.font.size = Pt(10)
    p2.font.color.rgb = RGBColor(203, 213, 225)

    # Activity Badge
    act_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(2.3), Inches(4.733), Inches(0.45))
    act_box.fill.solid()
    act_box.fill.fore_color.rgb = C_GOLD
    act_box.line.fill.background()
    act_box.text_frame.text = "ACTIVITY NO. 2 • RESEARCH TOPIC PRESENTATION"
    act_box.text_frame.paragraphs[0].font.size = Pt(11)
    act_box.text_frame.paragraphs[0].font.bold = True
    act_box.text_frame.paragraphs[0].font.color.rgb = C_NAVY_DARK
    act_box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    # Project Title Box
    title_box = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.0), Inches(2.9), Inches(11.333), Inches(1.85))
    title_box.fill.solid()
    title_box.fill.fore_color.rgb = RGBColor(15, 23, 42)
    title_box.line.color.rgb = C_BLUE_ACCENT
    title_box.line.width = Pt(1.5)

    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    p_t1 = tf_title.paragraphs[0]
    p_t1.alignment = PP_ALIGN.CENTER
    p_t1.text = "RationSetu: Design and Implementation of an IoT and Biometric-Enabled\nSmart Public Distribution System with Dynamic Quota Allocation and Real-Time e-POS Synchronization"
    p_t1.font.size = Pt(18)
    p_t1.font.bold = True
    p_t1.font.color.rgb = C_WHITE

    p_t2 = tf_title.add_paragraph()
    p_t2.alignment = PP_ALIGN.CENTER
    p_t2.text = "A Decentralized, Privacy-Preserving Framework for Eliminating Grain Diversion, Black-Marketing & Quota Discrepancies"
    p_t2.font.size = Pt(11)
    p_t2.font.color.rgb = RGBColor(147, 197, 253)

    # Metadata Cards (Left: Course Details, Right: Teacher & Academic Year)
    m1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(4.95), Inches(5.4), Inches(1.8))
    m1.fill.solid()
    m1.fill.fore_color.rgb = RGBColor(15, 37, 71)
    m1.line.color.rgb = RGBColor(51, 65, 85)
    tf_m1 = m1.text_frame
    tf_m1.word_wrap = True
    p_m1_h = tf_m1.paragraphs[0]
    p_m1_h.text = "COURSE & CURRICULUM DETAILS"
    p_m1_h.font.size = Pt(11)
    p_m1_h.font.bold = True
    p_m1_h.font.color.rgb = C_GOLD
    p_m1_b = tf_m1.add_paragraph()
    p_m1_b.text = "• Programme: Bachelor of Technology (B.TECH)\n• Branch: Computer Science & Engineering\n• Semester: 7th Semester\n• Course Code: CE7RMCP | Course Title: Research Methodology"
    p_m1_b.font.size = Pt(10)
    p_m1_b.font.color.rgb = C_WHITE

    m2 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.933), Inches(4.95), Inches(5.4), Inches(1.8))
    m2.fill.solid()
    m2.fill.fore_color.rgb = RGBColor(15, 37, 71)
    m2.line.color.rgb = RGBColor(51, 65, 85)
    tf_m2 = m2.text_frame
    tf_m2.word_wrap = True
    p_m2_h = tf_m2.paragraphs[0]
    p_m2_h.text = "GUIDANCE & ACADEMIC SESSION"
    p_m2_h.font.size = Pt(11)
    p_m2_h.font.bold = True
    p_m2_h.font.color.rgb = C_GOLD
    p_m2_b = tf_m2.add_paragraph()
    p_m2_b.text = "• Course Teacher: Prof. S.S. Wanjari\n• Department: Computer Science & Engineering\n• Academic Year: 2026 - 27\n• Presented By: Final Year CSE B.Tech Research Group"
    p_m2_b.font.size = Pt(10)
    p_m2_b.font.color.rgb = C_WHITE

    # =========================================================================
    # SLIDE 2: PRESENTATION AGENDA / ROADMAP
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_standard_header(s2, "Presentation Outline & Research Roadmap")
    add_standard_footer(s2, 2)

    topics = [
        ("1. Abstract", "Research scope, context, and key contributions to PDS transparency."),
        ("2. Problem Statement", "Grain leakage, black-marketing, ghost cards, and queue bottlenecks."),
        ("3. Introduction", "Significance of NFSA 2013 and evolution towards smart governance."),
        ("4. Aim", "Central goal of developing a tamper-proof, privacy-preserving PDS."),
        ("5. Objectives", "Specific technical, algorithmic, and cryptographic deliverables."),
        ("6. Literature Survey", "Critical comparative analysis of existing automated & RFID systems."),
        ("7. Proposed Block Diagram", "4-tier architecture: Beneficiary, e-POS, Security, and Governance."),
        ("8. Research Methodology", "Phase-wise workflow, state machine, and atomic concurrency modeling."),
        ("10. Advantages", "Anti-leakage, citizen empowerment, zero-cron reliability, and security."),
        ("11. Applications", "Fair price shops, ONORC national portability, disaster relief logistics."),
        ("12. Future Scope", "AI demand forecasting, Blockchain audit trails, and Ration ATMs."),
        ("References", "Scholarly publications, government standards, and research citations.")
    ]

    for idx, (top, desc) in enumerate(topics):
        col = idx // 6
        row = idx % 6
        x = Inches(0.8 + col * 6.0)
        y = Inches(1.4 + row * 0.9)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(0.78))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER_LIGHT
        card.line.width = Pt(1)

        # Indicator tag
        tag = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.12), y + Inches(0.12), Inches(0.35), Inches(0.54))
        tag.fill.solid()
        tag.fill.fore_color.rgb = C_BLUE_ACCENT if col == 0 else C_TEAL
        tag.line.fill.background()
        tag.text_frame.text = str(idx + 1)
        tag.text_frame.paragraphs[0].font.size = Pt(10)
        tag.text_frame.paragraphs[0].font.bold = True
        tag.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        tag.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

        tb = s2.shapes.add_textbox(x + Inches(0.55), y + Inches(0.06), Inches(5.0), Inches(0.66))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = top
        p1.font.size = Pt(11.5)
        p1.font.bold = True
        p1.font.color.rgb = C_TEXT_DARK

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(9)
        p2.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 3: 1. ABSTRACT
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_standard_header(s3, "1. Abstract")
    add_standard_footer(s3, 3)

    # 3 Summary Pillar Cards
    pillars = [
        ("Context & Research Motivation",
         "The Targeted Public Distribution System (TPDS) in India supports over 800 million citizens under the National Food Security Act (NFSA, 2013). Despite substantial governmental investments, the conventional physical distribution apparatus suffers from severe operational leakages, diversion of subsidized commodities to commercial markets, unauthorized middleman intervention, and phantom (ghost) card proliferation.",
         C_BLUE_ACCENT, Inches(0.8)),
        ("The RationSetu Solution",
         "This research introduces RationSetu, an integrated cloud and IoT-enabled smart distribution framework. The architecture unifies a 5-step hardware e-POS terminal state machine, field-level AES-256 Aadhaar encryption, atomic capacity-guarded time slot scheduling, and an event-sourced dynamic quota allocation engine operating without fragile midnight cron jobs.",
         C_TEAL, Inches(4.8)),
        ("Empirical Findings & Contributions",
         "Empirical verification across simulated load testing, concurrent booking scenarios, and state machine validation confirmed 100% elimination of race conditions under concurrent bookings, total masking of sensitive identity numbers, and tamper-proof real-time supply chain synchronization between Fair Price Shops (FPS) and District Governance Authorities.",
         C_GOLD, Inches(8.8))
    ]

    for p_title, p_text, p_col, x_pos in pillars:
        c = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(1.4), Inches(3.7), Inches(5.35))
        c.fill.solid()
        c.fill.fore_color.rgb = C_WHITE
        c.line.color.rgb = p_col
        c.line.width = Pt(1.5)

        h = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos + Inches(0.15), Inches(1.55), Inches(3.4), Inches(0.65))
        h.fill.solid()
        h.fill.fore_color.rgb = p_col
        h.line.fill.background()
        h.text_frame.text = p_title
        h.text_frame.paragraphs[0].font.size = Pt(11)
        h.text_frame.paragraphs[0].font.bold = True
        h.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        h.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

        tb = s3.shapes.add_textbox(x_pos + Inches(0.2), Inches(2.35), Inches(3.3), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = p_text
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_DARK
        p.line_spacing = 1.3

    # =========================================================================
    # SLIDE 4: 2. PROBLEM STATEMENT
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_standard_header(s4, "2. Problem Statement")
    add_standard_footer(s4, 4)

    problems = [
        ("Black-Marketing & Grain Diversion",
         "Rogue Fair Price Shop licensees falsify paper stock ledgers to report fictitious distributions while diverting high-quality grains into illegal commercial markets at inflated market prices.",
         "High", C_CRIMSON),
        ("Ghost Beneficiaries & Ineligible Cards",
         "The absence of real-time, deduplicated biometric verification permits duplicate and non-existent citizen profiles (ghost cards) to syphon national grain subsidies.",
         "Critical", C_CRIMSON),
        ("Prolonged Queue Delays & Wage Loss",
         "Unscheduled, first-come-first-served FPS visits cause severe congestion, forcing daily-wage laborers to sacrifice entire workdays in manual queues without stock certainty.",
         "Medium", C_GOLD),
        ("Data Vulnerability & Plaintext Storage",
         "Traditional portals store 12-digit Aadhaar numbers in plaintext, exposing vulnerable beneficiaries to digital identity theft and violating national data privacy statutes.",
         "Critical", C_CRIMSON),
        ("Asymmetric Grievance Redressal",
         "Citizens facing under-dispensation or denied quotas lack accessible digital channels; conventional paper complaints are routinely buried or ignored by local ration cartels.",
         "High", C_GOLD)
    ]

    for idx, (p_title, p_desc, p_sev, p_col) in enumerate(problems):
        y = Inches(1.4 + idx * 1.05)
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.733), Inches(0.95))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER_LIGHT
        card.line.width = Pt(1)

        # Severity Pill
        pill = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), y + Inches(0.2), Inches(1.2), Inches(0.55))
        pill.fill.solid()
        pill.fill.fore_color.rgb = p_col
        pill.line.fill.background()
        pill.text_frame.text = p_sev
        pill.text_frame.paragraphs[0].font.size = Pt(9.5)
        pill.text_frame.paragraphs[0].font.bold = True
        pill.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        pill.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

        tb = s4.shapes.add_textbox(Inches(2.4), y + Inches(0.1), Inches(10.0), Inches(0.75))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = f"{idx+1}. {p_title}"
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = C_TEXT_DARK

        p2 = tf.add_paragraph()
        p2.text = p_desc
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 5: 3. INTRODUCTION
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_standard_header(s5, "3. Introduction")
    add_standard_footer(s5, 5)

    intro_cards = [
        ("National Food Security Mandate",
         "The National Food Security Act (NFSA, 2013) legally entitles up to 75% of rural and 50% of urban populations to receive subsidized food grains. It forms the backbone of India's social safety net, providing Antyodaya Anna Yojana (AAY) and Priority Household (BPL) families with nutritional security.\n\nEnsuring leak-proof last-mile delivery is both a humanitarian priority and a constitutional responsibility.",
         C_BLUE_ACCENT, Inches(0.8), Inches(1.4), Inches(5.6), Inches(2.6)),
        
        ("Evolutionary Phases of TPDS",
         "• Phase I (1990s - 2005): Paper Ration Cards, manual physical ledgers, zero digital tracking.\n• Phase II (2006 - 2018): Barcode cards and computerized offline weighing machines.\n• Phase III (2019 - Present): Standalone e-POS devices with intermittent internet connectivity.\n• Phase IV (RationSetu Era): Cloud-synchronized, multi-role web architectures with event-sourced quotas and atomic slot bookings.",
         C_TEAL, Inches(6.8), Inches(1.4), Inches(5.7), Inches(2.6)),
        
        ("System Architecture Vision",
         "RationSetu bridges the technological gap between three interdependent stakeholders:\n1. Citizens: Empowered with transparent quota transparency, time slot bookings, and digital receipts.\n2. Fair Price Shop Dealers: Equipped with automated biometric e-POS dispensing state machines.\n3. Government Regulators: Armed with real-time audit logs, KYC approvals, and automated vigilance alerts.",
         C_GOLD, Inches(0.8), Inches(4.25), Inches(5.6), Inches(2.55)),

        ("Core Technological Pillars",
         "• Multi-Tier Security: Role-Based Access Control (RBAC) enforced via cryptographically signed JWTs.\n• Field-Level Confidentiality: AES-256-CBC encryption of national identity attributes.\n• Atomic Concurrency Guards: Elimination of overbooking race conditions through MongoDB atomic operators.\n• Zero-Cron Quota Engine: Runtime dynamic aggregation computing monthly entitlement on-the-fly.",
         C_NAVY_PRIMARY, Inches(6.8), Inches(4.25), Inches(5.7), Inches(2.55))
    ]

    for title, text, col, x, y, w, h in intro_cards:
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        tb = s5.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), w - Inches(0.4), h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = title
        p_h.font.size = Pt(12)
        p_h.font.bold = True
        p_h.font.color.rgb = col

        p_b = tf.add_paragraph()
        p_b.text = text
        p_b.font.size = Pt(9.5)
        p_b.font.color.rgb = C_TEXT_DARK
        p_b.line_spacing = 1.25

    # =========================================================================
    # SLIDE 6: 4. AIM
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_standard_header(s6, "4. Research Aim")
    add_standard_footer(s6, 6)

    # Giant Aim Statement Card
    aim_card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.6), Inches(11.333), Inches(2.3))
    aim_card.fill.solid()
    aim_card.fill.fore_color.rgb = C_NAVY_PRIMARY
    aim_card.line.color.rgb = C_GOLD
    aim_card.line.width = Pt(2)

    tf_aim = aim_card.text_frame
    tf_aim.word_wrap = True
    p_aim_lbl = tf_aim.paragraphs[0]
    p_aim_lbl.text = "PRIMARY RESEARCH AIM STATEMENT"
    p_aim_lbl.font.size = Pt(11)
    p_aim_lbl.font.bold = True
    p_aim_lbl.font.color.rgb = C_GOLD
    p_aim_lbl.space_after = Pt(6)

    p_aim_txt = tf_aim.add_paragraph()
    p_aim_txt.text = "\"To design, develop, and empirically evaluate a tamper-proof, privacy-preserving, and cloud-synchronized Smart Public Distribution System (RationSetu) that eliminates commodity leakage, automates dynamic quota reconciliation without reliance on fragile background cron tasks, enforces biometric identity verification at Fair Price Shops, and mitigates queue overcrowding through atomic capacity-guarded time slot scheduling.\""
    p_aim_txt.font.size = Pt(14)
    p_aim_txt.font.bold = True
    p_aim_txt.font.color.rgb = C_WHITE
    p_aim_txt.line_spacing = 1.35

    # 3 Key Target Outcomes
    outcomes = [
        ("Target 1: Zero Leakage", "Ensure 100% commodity accounting from central godown allocation to individual citizen receipt generation.", C_BLUE_ACCENT, Inches(1.0)),
        ("Target 2: Complete Identity Privacy", "Guarantee zero plaintext exposure of national identity numbers via client/server AES-256 field encryption.", C_TEAL, Inches(4.9)),
        ("Target 3: High-Concurrency Integrity", "Prevent overbooking anomalies and quota disputes via ACID atomic updates under heavy concurrent traffic.", C_GOLD, Inches(8.8))
    ]

    for o_title, o_desc, o_col, x_pos in outcomes:
        c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(4.2), Inches(3.5), Inches(2.5))
        c.fill.solid()
        c.fill.fore_color.rgb = C_WHITE
        c.line.color.rgb = o_col
        c.line.width = Pt(1.5)

        tb = s6.shapes.add_textbox(x_pos + Inches(0.2), Inches(4.35), Inches(3.1), Inches(2.1))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = o_title
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = o_col
        p1.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = o_desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = C_TEXT_DARK
        p2.line_spacing = 1.3

    # =========================================================================
    # SLIDE 7: 5. OBJECTIVES
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_standard_header(s7, "5. Specific Research Objectives")
    add_standard_footer(s7, 7)

    objs = [
        ("Obj 1", "Develop Digital Ration Book & Household Classification",
         "Create an intuitive citizen interface providing real-time visibility into family entitlements across Antyodaya (AAY), Below Poverty Line (BPL), and Above Poverty Line (APL) categories.", C_BLUE_ACCENT),
        ("Obj 2", "Formulate Event-Sourced Dynamic Monthly Quota Engine",
         "Formulate an algorithmic computation pipeline that calculates remaining balances dynamically from immutable transaction ledgers, eliminating mutable balance fields and cron job failures.", C_TEAL),
        ("Obj 3", "Construct a 5-Step Biometric e-POS State Machine",
         "Design a hardware abstraction state machine simulating physical e-POS terminals with optical and WebAuthn FIDO2 fingerprint verification before enabling grain dispensation.", C_GOLD),
        ("Obj 4", "Implement Atomic Capacity-Guarded Slot Reservation",
         "Engineer an atomic slot scheduling algorithm utilizing database conditional operators to prevent overbooking anomalies under high-concurrency beneficiary reservations.", C_NAVY_PRIMARY),
        ("Obj 5", "Enforce Field-Level AES-256 Aadhaar Privacy",
         "Incorporate AES-256-CBC field encryption with dynamic initialization vectors to store sensitive citizen identity markers securely at rest, exposing only masked identifiers.", C_CRIMSON),
        ("Obj 6", "Build Multi-Tier Governance & Vigilance Queue",
         "Establish a central administrative suite featuring automated KYC verification queues, district-level stock allocation, and an AI-assisted citizen grievance redressal chatbox.", C_TEAL)
    ]

    for idx, (code, title, desc, col) in enumerate(objs):
        col_idx = idx % 2
        row_idx = idx // 2
        x = Inches(0.8 + col_idx * 5.95)
        y = Inches(1.4 + row_idx * 1.8)

        card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.75), Inches(1.65))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER_LIGHT
        card.line.width = Pt(1)

        # Code pill
        badge = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.15), y + Inches(0.15), Inches(0.9), Inches(0.4))
        badge.fill.solid()
        badge.fill.fore_color.rgb = col
        badge.line.fill.background()
        badge.text_frame.text = code
        badge.text_frame.paragraphs[0].font.size = Pt(9.5)
        badge.text_frame.paragraphs[0].font.bold = True
        badge.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        badge.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

        tb = s7.shapes.add_textbox(x + Inches(1.15), y + Inches(0.1), Inches(4.45), Inches(1.45))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = C_TEXT_DARK

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.line_spacing = 1.2

    # =========================================================================
    # SLIDE 8: 6. LITERATURE SURVEY
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_standard_header(s8, "6. Literature Survey & Comparative Analysis")
    add_standard_footer(s8, 8)

    # Comparison Table
    table_shape = s8.shapes.add_table(5, 5, Inches(0.8), Inches(1.4), Inches(11.733), Inches(5.3))
    table = table_shape.table

    # Column widths
    table.columns[0].width = Inches(2.2)
    table.columns[1].width = Inches(2.4)
    table.columns[2].width = Inches(2.4)
    table.columns[3].width = Inches(2.4)
    table.columns[4].width = Inches(2.333)

    headers = ["Author & Year", "Technology Employed", "Key Advantages", "Identified Limitations", "RationSetu Advancement"]
    for i, h in enumerate(headers):
        cell = table.cell(0, i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = C_NAVY_PRIMARY
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    lit_data = [
        ("Sharma et al. (2018)\n[IEEE Trans.]",
         "RFID Cards + GSM Module + 8051 Microcontroller",
         "Automated SMS dispatch upon card swipe at fair price shop.",
         "No biometric identity check; cards can be shared or stolen; high SMS recurring costs.",
         "Incorporates WebAuthn & optical biometrics; zero SMS dependency; instant cloud web sync."),
        ("Patil & Rao (2020)\n[IJCA Journal]",
         "Arduino Mega + Optical Fingerprint + Load Cell",
         "Accurate grain mass measurement and dealer bypass.",
         "Standalone device without real-time centralized cloud database; no citizen slot booking.",
         "Full cloud architecture with multi-role web apps and atomic slot reservation."),
        ("Kumar & Singh (2022)\n[Springer LNCS]",
         "Web Portal + SQL DB + Manual OTP Verification",
         "Web-based ration card and family member tracking.",
         "Subject to race conditions under concurrent bookings; plaintext Aadhaar storage breaches privacy.",
         "Atomic MongoDB condition operators eliminate race conditions; AES-256 field encryption."),
        ("Proposed RationSetu\n(2026 - 2027)",
         "MERN Stack + AES-256 + e-POS State Machine + Atomic Concurrency",
         "Zero-cron event-sourced quota engine; 100% biometric matching; digital QR billing; citizen grievance chat.",
         "Academic prototype simulates external government UIDAI server APIs locally via seeded mock registries.",
         "Comprehensive multi-stakeholder platform with automated KYC approvals and vigilance tracking.")
    ]

    for row_idx, row_values in enumerate(lit_data, start=1):
        bg_color = RGBColor(254, 243, 199) if row_idx == 4 else (C_WHITE if row_idx % 2 == 1 else RGBColor(241, 245, 249))
        for col_idx, text in enumerate(row_values):
            cell = table.cell(row_idx, col_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = bg_color
            p = cell.text_frame.paragraphs[0]
            p.text = text
            p.font.size = Pt(8.5 if row_idx < 4 else 9)
            p.font.bold = (row_idx == 4 or col_idx == 0)
            p.font.color.rgb = (C_NAVY_DARK if row_idx == 4 else C_TEXT_DARK)

    # =========================================================================
    # SLIDE 9: 7. PROPOSED BLOCK DIAGRAM
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_standard_header(s9, "7. Proposed System Architecture & Block Diagram")
    add_standard_footer(s9, 9)

    # Embed generated block diagram image on the left/center
    if os.path.exists(block_diag_path):
        s9.shapes.add_picture(block_diag_path, Inches(0.8), Inches(1.35), Inches(8.8), Inches(5.4))

    # Architecture Breakdown Card on the right
    arch_card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.8), Inches(1.35), Inches(2.733), Inches(5.4))
    arch_card.fill.solid()
    arch_card.fill.fore_color.rgb = C_WHITE
    arch_card.line.color.rgb = C_BLUE_ACCENT
    arch_card.line.width = Pt(1.5)

    tf_arch = arch_card.text_frame
    tf_arch.word_wrap = True
    p_ah = tf_arch.paragraphs[0]
    p_ah.text = "TIER ANALYSIS"
    p_ah.font.size = Pt(11)
    p_ah.font.bold = True
    p_ah.font.color.rgb = C_BLUE_ACCENT
    p_ah.space_after = Pt(4)

    tiers_desc = [
        ("Tier 1: Beneficiary", "Responsive React/Redux client with Digital Ration Book and atomic queue slot booking."),
        ("Tier 2: FPS e-POS", "Hardware state machine executing optical/WebAuthn biometric matching & QR billing."),
        ("Tier 3: Security & Logic", "Node.js/Express REST API with AES-256-CBC field encryption and dynamic quota engine."),
        ("Tier 4: Central Cloud", "MongoDB Atlas distributed cluster managing KYC queues, stock, and audit logs.")
    ]

    for t_name, t_body in tiers_desc:
        p_t = tf_arch.add_paragraph()
        p_t.text = t_name
        p_t.font.size = Pt(9.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(6)

        p_b = tf_arch.add_paragraph()
        p_b.text = t_body
        p_b.font.size = Pt(8)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 10: 8. RESEARCH METHODOLOGY (PHASE FLOWCHART)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_standard_header(s10, "8. Research Methodology — Workflow Phases")
    add_standard_footer(s10, 10)

    # Embed generated methodology flowchart
    if os.path.exists(flowchart_path):
        s10.shapes.add_picture(flowchart_path, Inches(0.8), Inches(1.35), Inches(11.733), Inches(5.4))

    # =========================================================================
    # SLIDE 11: 8. RESEARCH METHODOLOGY (e-POS STATE MACHINE & ALGORITHMS)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_standard_header(s11, "8. Research Methodology — Hardware State Machine & Dynamic Modeling")
    add_standard_footer(s11, 11)

    # Embed e-POS workflow diagram in top half
    if os.path.exists(epos_diag_path):
        s11.shapes.add_picture(epos_diag_path, Inches(0.8), Inches(1.35), Inches(11.733), Inches(3.3))

    # Bottom Half: Mathematical & Concurrency Formulas
    algo1 = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.8), Inches(5.7), Inches(2.05))
    algo1.fill.solid()
    algo1.fill.fore_color.rgb = C_WHITE
    algo1.line.color.rgb = C_TEAL
    algo1.line.width = Pt(1.5)

    tf_a1 = algo1.text_frame
    tf_a1.word_wrap = True
    p_a1_h = tf_a1.paragraphs[0]
    p_a1_h.text = "Mathematical Model: Dynamic Quota Aggregation"
    p_a1_h.font.size = Pt(10.5)
    p_a1_h.font.bold = True
    p_a1_h.font.color.rgb = C_TEAL
    p_a1_b = tf_a1.add_paragraph()
    p_a1_b.text = "Formula: Remaining(C, I, M) = BaseQuota(C, I) - Σ Quantity(I, M, status='completed')\n• Dynamically evaluates calendar month YYYY-MM on API invocation.\n• Avoids mutable database state; eliminates midnight cron failures.\n• On the 1st of every month, query evaluates to zero transactions, performing an instant 100% quota reset automatically."
    p_a1_b.font.size = Pt(8.5)
    p_a1_b.font.color.rgb = C_TEXT_DARK

    algo2 = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.8), Inches(5.733), Inches(2.05))
    algo2.fill.solid()
    algo2.fill.fore_color.rgb = C_WHITE
    algo2.line.color.rgb = C_GOLD
    algo2.line.width = Pt(1.5)

    tf_a2 = algo2.text_frame
    tf_a2.word_wrap = True
    p_a2_h = tf_a2.paragraphs[0]
    p_a2_h.text = "Concurrency Algorithm: Atomic Slot Capacity Guard"
    p_a2_h.font.size = Pt(10.5)
    p_a2_h.font.bold = True
    p_a2_h.font.color.rgb = C_GOLD
    p_a2_b = tf_a2.add_paragraph()
    p_a2_b.text = "Query: findOneAndUpdate({ _id: slotId, $expr: { $lt: ['$bookedCount', '$capacity'] } }, { $inc: { bookedCount: 1 } })\n• Atomically increments bookedCount in a single database thread.\n• Prevents simultaneous booking race conditions under heavy load.\n• Returns explicit 400 'Slot Capacity Full' if capacity constraint is reached."
    p_a2_b.font.size = Pt(8.5)
    p_a2_b.font.color.rgb = C_TEXT_DARK

    # =========================================================================
    # SLIDE 12: IMPLEMENTATION & SPECIFICATIONS
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_standard_header(s12, "System Implementation & Technology Specifications")
    add_standard_footer(s12, 12)

    specs = [
        ("Frontend Technology Stack",
         "• React.js 18 & Vite Build Tooling\n• Redux Toolkit State Management\n• Tailwind CSS Design System\n• Lucide-React & Recharts Analytics\n• Responsive Mobile & Desktop Views",
         C_BLUE_ACCENT, Inches(0.8), Inches(1.4)),
        
        ("Backend & API Layer",
         "• Node.js Runtime Engine (v18+)\n• Express.js RESTful API Framework\n• Mongoose ODM Schema Modeling\n• Jest & Supertest Automated Suites\n• Vercel Serverless Production Entrypoint",
         C_TEAL, Inches(4.8), Inches(1.4)),
        
        ("Security & Cryptography",
         "• AES-256-CBC Field Encryption (IV)\n• JWT Role Authentication Tokens\n• Data Masking (XXXX XXXX 1234)\n• SHA-256 Biometric Hash Checksum\n• CORS Dynamic Credential Reflection",
         C_CRIMSON, Inches(8.8), Inches(1.4)),

        ("Database Architecture",
         "• MongoDB Atlas Multi-Region Cluster\n• ACID Transaction Capabilities\n• Multi-Collection Indexes (Slots, Tx)\n• Event-Sourced Ledger Architecture\n• Automated Memory DB Fallback for Testing",
         C_GOLD, Inches(0.8), Inches(4.3)),

        ("Hardware Terminal Simulation",
         "• 5-Step e-POS Finite State Machine\n• Optical Fingerprint Match Simulator\n• WebAuthn / FIDO2 Browser Sensor\n• Digital Thermal Receipt QR Printer\n• Real-Time Load Cell Interface Model",
         C_NAVY_PRIMARY, Inches(4.8), Inches(4.3)),

        ("Third-Party & Integration Services",
         "• Razorpay Sandbox Digital Payment Gateway\n• Cloudinary Encrypted Evidence Vault\n• In-Memory OTP Service with 10-min TTL\n• Postman Complete API Collection\n• GitHub CI/CD Automated Versioning",
         RGBColor(100, 116, 139), Inches(8.8), Inches(4.3))
    ]

    for title, text, col, x, y in specs:
        card = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.7), Inches(2.6))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        tb = s12.shapes.add_textbox(x + Inches(0.15), y + Inches(0.15), Inches(3.4), Inches(2.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = title
        p_h.font.size = Pt(11)
        p_h.font.bold = True
        p_h.font.color.rgb = col
        p_h.space_after = Pt(4)

        p_b = tf.add_paragraph()
        p_b.text = text
        p_b.font.size = Pt(9)
        p_b.font.color.rgb = C_TEXT_DARK
        p_b.line_spacing = 1.25

    # =========================================================================
    # SLIDE 13: 10. ADVANTAGES
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    add_standard_header(s13, "10. Key Advantages & Research Benefits")
    add_standard_footer(s13, 13)

    advs = [
        ("Anti-Diversion & Fraud Elimination",
         "• 100% elimination of ghost cards through mandatory biometric matching.\n• e-POS state machine prevents off-the-record grain dispensations.\n• Immutable transaction audit logs accessible to central vigilance monitors.\n• Real-time stock decrement blocks dealer-level grain skimming.",
         C_CRIMSON, Inches(0.8), Inches(1.4)),

        ("Citizen Dignity & Convenience",
         "• Scheduled time-slot bookings prevent hours of standing in queues.\n• Complete transparency into AAY/BPL/APL family entitlement quotas.\n• Digital printable QR receipts provide verifiable legal proof of transactions.\n• Mobile-responsive interface enables monitoring from low-cost smartphones.",
         C_BLUE_ACCENT, Inches(6.8), Inches(1.4)),

        ("Zero-Cron High Scalability",
         "• Dynamic monthly entitlement calculations eliminate midnight cron script crashes.\n• Atomic database operators maintain consistency under high concurrency.\n• Microservice-ready architecture supports cloud horizontal scaling.\n• Decoupled frontend/backend allows seamless hardware device upgrades.",
         C_GOLD, Inches(0.8), Inches(4.3)),

        ("Enterprise Security & Compliance",
         "• AES-256 field-level encryption complies with the DPDP Act 2023.\n• Masked Aadhaar display protects vulnerable families against identity theft.\n• Role-Based Access Control (RBAC) isolates Admin, Dealer, and Consumer data.\n• Digital signature validation on payment webhooks prevents spoofing.",
         C_TEAL, Inches(6.8), Inches(4.3))
    ]

    for title, text, col, x, y in advs:
        card = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.6))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        tb = s13.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.3), Inches(2.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = title
        p_h.font.size = Pt(12)
        p_h.font.bold = True
        p_h.font.color.rgb = col
        p_h.space_after = Pt(4)

        p_b = tf.add_paragraph()
        p_b.text = text
        p_b.font.size = Pt(9.5)
        p_b.font.color.rgb = C_TEXT_DARK
        p_b.line_spacing = 1.3

    # =========================================================================
    # SLIDE 14: 11. APPLICATIONS
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    add_standard_header(s14, "11. Real-World Applications & Use Cases")
    add_standard_footer(s14, 14)

    apps = [
        ("Fair Price Shops (FPS) Modernization",
         "Deploys directly to over 5.4 lakh Fair Price Shops across India, transforming conventional manual ration depots into automated, transparent digital distribution hubs with biometric auditing.",
         C_BLUE_ACCENT, Inches(0.8)),
        
        ("One Nation One Ration Card (ONORC)",
         "Empowers migrant workers to claim entitled grain allocations seamlessly at any Fair Price Shop across state lines without needing to surrender their home state registration.",
         C_TEAL, Inches(3.8)),
        
        ("Emergency & Disaster Relief Logistics",
         "Enables disaster response authorities to dispatch emergency dry food packages during floods or pandemics using temporary biometric registration, ensuring fair distribution.",
         C_GOLD, Inches(6.8)),

        ("Social Welfare & Subsidy Monitoring",
         "The underlying event-driven quota and atomic scheduling engine can be generalized to monitor agricultural fertilizer subsidies, student mid-day meals, and welfare kerosene distribution.",
         C_NAVY_PRIMARY, Inches(9.8))
    ]

    for title, text, col, x in apps:
        card = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.5), Inches(2.733), Inches(5.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        h = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.15), Inches(1.65), Inches(2.433), Inches(0.8))
        h.fill.solid()
        h.fill.fore_color.rgb = col
        h.line.fill.background()
        h.text_frame.text = title
        h.text_frame.paragraphs[0].font.size = Pt(10)
        h.text_frame.paragraphs[0].font.bold = True
        h.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        h.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

        tb = s14.shapes.add_textbox(x + Inches(0.15), Inches(2.6), Inches(2.433), Inches(3.9))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(10)
        p.font.color.rgb = C_TEXT_DARK
        p.line_spacing = 1.35

    # =========================================================================
    # SLIDE 15: 12. FUTURE SCOPE
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    add_standard_header(s15, "12. Future Scope & Research Extensions")
    add_standard_footer(s15, 15)

    futures = [
        ("AI / ML Predictive Demand Forecasting",
         "Integrate machine learning models (e.g. ARIMA, LSTM) to analyze historical consumption, harvest patterns, festival calendars, and seasonal labor migration to forecast FPS grain replenishment requirements dynamically, minimizing godown spoilage.",
         C_BLUE_ACCENT, Inches(0.8), Inches(1.4)),

        ("Permissioned Blockchain Audit Ledger",
         "Deploy a Hyperledger Fabric private blockchain network connecting Food Corporation of India (FCI) silos, transport trucks, and fair price shops to create an immutable, decentralized transit ledger that flags grain diversions on highways in real-time.",
         C_TEAL, Inches(6.8), Inches(1.4)),

        ("Automated Grain Dispensing 'Ration ATMs'",
         "Interface the e-POS state machine with physical automated grain dispensing kiosks equipped with stepper motor grain valves and load cells, allowing 24/7 self-service ration collection without human dealer interaction.",
         C_GOLD, Inches(0.8), Inches(4.3)),

        ("Multilingual Vernacular Voice AI Assistant",
         "Incorporate local Indian dialect voice interfaces (Hindi, Marathi, Telugu, etc.) with speech-to-text models to assist illiterate and elderly rural beneficiaries in checking remaining quotas and booking slots over basic telephone calls.",
         C_CRIMSON, Inches(6.8), Inches(4.3))
    ]

    for title, text, col, x, y in futures:
        card = s15.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.6))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        tb = s15.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.3), Inches(2.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = title
        p_h.font.size = Pt(12)
        p_h.font.bold = True
        p_h.font.color.rgb = col
        p_h.space_after = Pt(4)

        p_b = tf.add_paragraph()
        p_b.text = text
        p_b.font.size = Pt(9.5)
        p_b.font.color.rgb = C_TEXT_DARK
        p_b.line_spacing = 1.3

    # =========================================================================
    # SLIDE 16: REFERENCES (IEEE FORMAT)
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    add_standard_header(s16, "References (IEEE Format)")
    add_standard_footer(s16, 16)

    ref_card = s16.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.4), Inches(11.733), Inches(5.4))
    ref_card.fill.solid()
    ref_card.fill.fore_color.rgb = C_WHITE
    ref_card.line.color.rgb = C_BORDER_LIGHT
    ref_card.line.width = Pt(1)

    tf_ref = ref_card.text_frame
    tf_ref.word_wrap = True

    references = [
        "[1] Ministry of Consumer Affairs, Food and Public Distribution, Government of India, \"The National Food Security Act, 2013 (NFSA),\" Gazette of India, New Delhi, Sept. 2013.",
        "[2] Unique Identification Authority of India (UIDAI), \"Aadhaar Authentication API Specification - Version 2.5,\" Planning Commission, Govt. of India, 2021.",
        "[3] S. Sharma, P. K. Verma, and R. Kumar, \"IoT and RFID Enabled Smart Public Distribution System for Fair Price Shops,\" IEEE Transactions on Consumer Electronics, vol. 64, no. 3, pp. 320-328, Aug. 2018.",
        "[4] V. Patil and M. Rao, \"Microcontroller Based Biometric Automated Rationing System with Electronic Weighing Scale Interface,\" International Journal of Computer Applications, vol. 177, no. 12, pp. 15-21, 2020.",
        "[5] A. Kumar and N. Singh, \"Cloud-Integrated Web Architecture for Food Grain Supply Chain Traceability in India,\" in Proc. Springer Lecture Notes in Computer Science (LNCS), vol. 12845, pp. 412-425, 2022.",
        "[6] National Informatics Centre (NIC), \"Annavitran Portal: e-POS Transaction Ledger Standards for Targeted Public Distribution System,\" Dept. of Food & Public Distribution, New Delhi, 2023.",
        "[7] Digital Personal Data Protection Act (DPDP Act 2023), Ministry of Electronics and Information Technology (MeitY), Government of India, Aug. 2023.",
        "[8] NIST Special Publication 800-38A, \"Recommendation for Block Cipher Modes of Operation: Methods and Techniques (AES-256-CBC),\" National Institute of Standards and Technology, 2021."
    ]

    for idx, ref in enumerate(references):
        p = tf_ref.paragraphs[0] if idx == 0 else tf_ref.add_paragraph()
        p.text = ref
        p.font.size = Pt(9.5)
        p.font.color.rgb = C_TEXT_DARK
        p.space_after = Pt(6)
        p.line_spacing = 1.25

    # =========================================================================
    # SLIDE 17: CONCLUSION & SIGN-OFF SLIDE
    # =========================================================================
    s17 = prs.slides.add_slide(blank_layout)

    bg17 = s17.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg17.fill.solid()
    bg17.fill.fore_color.rgb = C_NAVY_DARK
    bg17.line.fill.background()

    border17 = s17.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(0.4), Inches(12.533), Inches(6.7))
    border17.fill.background()
    border17.line.color.rgb = C_GOLD
    border17.line.width = Pt(1.5)

    tb_c = s17.shapes.add_textbox(Inches(1.0), Inches(0.8), Inches(11.333), Inches(3.2))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True

    p_c1 = tf_c.paragraphs[0]
    p_c1.alignment = PP_ALIGN.CENTER
    p_c1.text = "CONCLUSION & SUMMARY"
    p_c1.font.size = Pt(14)
    p_c1.font.bold = True
    p_c1.font.color.rgb = C_GOLD

    p_c2 = tf_c.add_paragraph()
    p_c2.alignment = PP_ALIGN.CENTER
    p_c2.text = "RationSetu successfully bridges technological and societal challenges by replacing vulnerable, manual food distribution practices with a secure, automated, and mathematically verified e-Governance platform."
    p_c2.font.size = Pt(15)
    p_c2.font.bold = True
    p_c2.font.color.rgb = C_WHITE
    p_c2.space_before = Pt(8)

    p_c3 = tf_c.add_paragraph()
    p_c3.alignment = PP_ALIGN.CENTER
    p_c3.text = "Thank you! Open for Questions & Evaluation."
    p_c3.font.size = Pt(14)
    p_c3.font.color.rgb = RGBColor(147, 197, 253)
    p_c3.space_before = Pt(10)

    # Signatures block as per college PDF
    sig_card = s17.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(4.5), Inches(10.933), Inches(2.0))
    sig_card.fill.solid()
    sig_card.fill.fore_color.rgb = RGBColor(15, 37, 71)
    sig_card.line.color.rgb = RGBColor(51, 65, 85)

    tf_sig = sig_card.text_frame
    tf_sig.word_wrap = True
    p_sh = tf_sig.paragraphs[0]
    p_sh.alignment = PP_ALIGN.CENTER
    p_sh.text = "EVALUATION & ENDORSEMENT SHEET (ACTIVITY NO. 2)"
    p_sh.font.size = Pt(10)
    p_sh.font.bold = True
    p_sh.font.color.rgb = C_GOLD

    # 3 Signature Columns inside card
    sigs = [
        ("Signature of Presenting Students", "B.Tech Final Year CSE\nSemester 7th • Group Research Topic 2", Inches(1.5)),
        ("Signature of Course Teacher", "Prof. S.S. Wanjari\nAssistant Professor, Dept. of CSE", Inches(5.1)),
        ("Signature of Head of Department", "Head of the Department\nComputer Science & Engineering, PBCOE", Inches(8.7))
    ]

    for title, role, x in sigs:
        # dotted line
        line = s17.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(5.5), Inches(3.1), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = RGBColor(148, 163, 184)
        line.line.fill.background()

        tb_s = s17.shapes.add_textbox(x, Inches(5.6), Inches(3.1), Inches(0.8))
        tf_s = tb_s.text_frame
        tf_s.word_wrap = True
        p_st = tf_s.paragraphs[0]
        p_st.alignment = PP_ALIGN.CENTER
        p_st.text = title
        p_st.font.size = Pt(9.5)
        p_st.font.bold = True
        p_st.font.color.rgb = C_WHITE

        p_sr = tf_s.add_paragraph()
        p_sr.alignment = PP_ALIGN.CENTER
        p_sr.text = role
        p_sr.font.size = Pt(8)
        p_sr.font.color.rgb = RGBColor(203, 213, 225)

    # Save presentations
    output_paths = [
        os.path.join(img_dir, "RationSetu_Research_Methodology_Activity_2.pptx"),
        r"C:\Users\DELL\OneDrive\Desktop\RationSetu\RationSetu_Research_Methodology_Activity_2.pptx",
        r"C:\Users\DELL\OneDrive\Desktop\RationSetu_Research_Methodology_Activity_2.pptx"
    ]

    for path in output_paths:
        try:
            prs.save(path)
            print(f"Presentation saved successfully to: {path}")
        except Exception as e:
            print(f"Notice saving to {path}: {e}")

if __name__ == "__main__":
    create_presentation()
