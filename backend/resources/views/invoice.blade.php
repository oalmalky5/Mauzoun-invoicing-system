<!DOCTYPE html>
<!-- saved from url=(0108)http://localhost:8000/report-print/2124900004?header=true&footer=true&electronically_verified=true&tests=6_0 -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Mauzoun QT2021MMDDNN Client</title>
    <style>
        @font-face {
            font-family: 'Merriweather', serif;
            src: url('vendor/mpdf/ttfonts/Merriweather-Regular.ttf');
        }

        body {
            width: 100%;
            /*height: 100%;*/
            margin: 0;
            padding: 0;
            margin-left: -20px;
            background-color: #fff;
            font: 9pt "Verdana";
        }

        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        .book .page {
            width: 190mm;
            /*min-height: 297mm;*/
            /*padding: 5mm; !*20mm*!*/
            margin: 0 auto;
            margin-top: 7px;
        }

        .book .subpage {
            /*height: 287mm;*/
            padding: 5px;
        }

        .book .logo {
            /*padding-left: 60%;*/
            width: 100%;
        }

        .book .logo p {
            /*text-align: center !important;*/
            margin-top: 0px !important;
            margin-bottom: 0px !important;
            margin: 4px;
        }

        .book .clear {
            clear: both;
        }

        .book .h-left {
            width: 50%;
            float: left;
        }

        .book .h-left h3 {
            margin-left: 4px;
            margin-bottom: 0px;
        }

        .book .h-left h3 span {
            font-size: 12px;
        }

        .book .h-right {
            width: 40%;
            float: right;
            margin-bottom: 14%;
            text-align: right;
        }

        .book .h-right img {
            width: 70%;
            margin-top: 14px;
        }

        .book .h-right h2 {
            font-size: 15px;
            letter-spacing: 11px;
            margin-left: 25px;
        }

        .book .h-row2 {
            margin: 1% 28px 5% 2px;
        }

        .book .bill-info {
            float: left;
            width: 40mm;
        }

        .book .bill-address {
            /*width: 50%;*/
            font-size: 11.5px;
        }

        .book .bill-address p {
            line-height: 1rem;
            margin-top: 0px;
        }

        .book .bill-name {
            font-size: 18px;
            font-weight: bold;
        }

        .book .bill-to-info {
            float: right;
            width: 120mm;
        }

        .book .bill-to-address {
            float: left;
            width: 70mm;
            font-size: 11.5px;
        }

        .book .bill-to-address p {
            line-height: 1rem;
            margin-top: 0px;
        }

        .book .bill-to-name {
            font-size: 18px;
            font-weight: bold;
        }

        .book table {
            width: 100%;
            line-height: 16pt;
            text-align: left;
            /*border-spacing: 0;*/
            border-collapse: collapse;
        }

        .book .maintablediv {
            min-height: 300px;
            /*border-bottom:1px solid #cecece;*/
        }

        .book .maintable {
            border: 1px solid #7f7f7f;
        }

        .book .maintable th {
            border: 1px solid #7f7f7f;
            font-size: 14px;
            line-height: 10px;
            text-align: center;
            padding: 12px;
        }

        .book .maintable td {
            border: 1px solid #7f7f7f;
            font-size: 14px;
            text-align: center;
        }

        .book .table {
            width: 285px;
            /*float: right;*/
            margin-left: 423px;
            border-top: 0px;
        }

        .book .table th {
            width: 160px;
        }

        .book .table td {
            width: 100px;
            background-color: #aad1ed;
        }

        .book p {
            color: #88685d;
            margin-top: 5px;
            margin-bottom: 0px;
        }

        .book h5 {
            font-size: 13px;
            margin-bottom: 5px;
            margin-top: 15px;
        }

        .book .confidentiality {
            /*margin-top: 15px;*/
        }

        .book .terms .confidentiality p {
            margin: 7px;
        }

        .book .round {
            margin-top: 15px;
        }

        .book .round p {
            margin-top: 0px;
            margin-bottom: 0px;
        }

        .book .guidelines {
            padding-top: 15px;
        }

        .book .guidelines p {
            margin-top: 0px;
            margin-bottom: 0px;
            /*line-height: ;*/
        }

        .book .project {
            /*padding-top: 17%;*/
        }

        .book b {
            color: #000;
        }

        .book .text-center {
            text-align: center;
        }

        .book .footer {
            margin-top: 100px;
            font-size: 10px;
        }

        .book .footer p {
            margin-top: 0px;
            margin-bottom: 0px;
            color: #88685d;
        }

        .book .text-start {
            text-align: start;
        }

        .book .m-t {
            margin-top: 25px
        }

        .book .m-t-130 {
            margin-top: 130px;
        }

        .book .web-logo {
            width: auto !important;
        }
    </style>
</head>
<body>
<div class="book">
    <div class="page">
        <div class="subpage">
            <div class="logo">
                <div class="h-left">
                    <h1>QUOTATION</h1>
                    <h3>{{$invoice->sr_no}}</h3>
                    <p>Invoice Prepared On</p>
                    <p>{{$invoice->date}}</p>
                    <p>Due On</p>
                    <p>{{$invoice->due_date}}</p>
                </div>
                <div class="h-right">
                    @if(!empty($is_pdf))
                        <img src="{{ './images/main-logo.png'}}" height="130px">
                    @else
                        <img class="web-logo" src="{{ asset('images/main-logo.png')}}" height="130px">
                    @endif

                </div>
            </div>
            <div class="clear"></div>
            <div class="h-row2">
                <div class="bill-info">
                    <div class="bill-name">Bill From</div>
                    <div class="bill-address">
                        <p>
                            layan@mauzoun.com<br/>
                            Layan Abdul Shakoor<br/>
                            Mauzoun Est.<br/>
                            Jeddah, Saudi Arabia
                        </p>
                    </div>
                </div>
                <div class="bill-to-info">
                    <div class="bill-to-name">Bill To</div>
                    <div class="bill-to-address">
                        <p>
                            {{$invoice->billing_email}}<br/>
                            {{$invoice->customer->name}}<br/>
                            {{$invoice->billing_company_name}}<br/>
                            {{$invoice->billing_email}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="maintablediv">
                <table class="maintable">
                    <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIPTION</th>
                        <th>QTY.</th>
                        <th>UNIT PRICE</th>
                        <th>TOTAL</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($invoice->details as $detail)
                        <tr>
                            <td class="text-center">{{$detail->item}}</td>
                            <td class="text-center">{{$detail->description}}</td>
                            <td class="text-center">{{$detail->price}}</td>
                            <td class="text-center">{{$detail->qty}}</td>
                            <td class="text-center">{{$detail->total}}</td>
                        </tr>
                    @endforeach;
                    </tbody>
                </table>
                <table class="maintable table">

                    <tr>
                        <th>TOTAL</th>
                        <td>{{$invoice->total}}</td>
                    </tr>
                    <tr>
                        <th>VAT 15%</th>
                        <td>{{$invoice->vat}}</td>
                    </tr>
                    <tr>
                        <th>SUBTOTAL</th>
                        <td>{{$invoice->sub_total}}</td>
                    </tr>
                    <tr>
                        <th>60%</th>
                        <td>{{$invoice->sub_total*60/100}}</td>
                    </tr>
                    <tr>
                        <th>40%</th>
                        <td>{{$invoice->sub_total*40/100}}</td>
                    </tr>
                </table>
            </div>
            <div class="clear"></div>
            <div class="terms">
                <h3>TERMS & CONDITIONS:</h3>
                <div>
                    <h5>I. Legality</h5>
                    <p>
                        – All of the terms and conditions stated in this quotation are legally binding upon the client
                        wiring any down payment to Mauzoun
                    </p>
                </div>

                <div class="confidentiality">
                    <h5>II. Confidentiality</h5>
                    <p>
                        – All exchanges between Mauzoun and the client will remain strictly confidential and will only
                        be discussed between the client and Mauzoun, or with third-party vendors approved by the client.
                    </p>
                    <p>
                        – The client adheres to maintaining strict confidentiality with Mauzoun and will not share with
                        any external party, under any circumstances, any internal Mauzoun documents, or any transcripts
                        of communications with any member of the Mauzoun Team.
                    </p>
                </div>

                <div>
                    <h5>III. Timeline & Information Handover</h5>
                    <p>– All project timelines begin by advance booking only</p>
                </div>
            </div>
            @if(!empty($is_pdf_))
                <div class="footer">
                    <p>VAT Registration 310145806100003</p>
                    <p>C.R. 4030360838</p>
                    <p>P.O. Box 23435, Jeddah, Saudi Arabia</p>
                    <p>Email hello@mauzoun.com</p>
                    <p><b>www.mauzoun.com</b></p>
                </div>
            @endif

            <div class="project">
                <p>
                    – The prerequisites of booking your project timeline are: a deposit of the project’s 60% down
                    payment,
                    completion of the Mauzoun Brief File sent to you, and sending the complete file handover as
                    specified by the
                    Mauzoun Team
                </p>
                <p>
                    – To book your project’s timeline, reply to your e-mail thread with Mauzoun confirming completion of
                    the
                    prerequisites stated above. Booking will be completed within maximum (2) business days.
                </p>
                <p>
                    – Timeline of the project will be <b>(X)</b> business days from booking date.
                </p>
                <p>
                    – If a client provides additional documents halfway through a work’s progress, and after finalized
                    information handover, an additional charge may be incurred, and the project timeline may be
                    extended.
                </p>
            </div>

            <div class="round">
                <h5>IV. Rounds of Changes</h5>
                <p>– The client has (2) rounds of changes per phase.</p>
                <p>– If the (2) rounds of changes have been fulfilled, and no additional rounds of changes have been
                    requested,
                    the project is considered completed and full pending payment is due.</p>
                <p>– Additional rounds of changes are available, but are subject to additional charge.</p>
                <p>– Rounds of changes will be implemented only upon receiving the full scope, and not partial scope, of
                    the
                    feedback.</p>
                <p>– Feedback must be submitted as direct comments annotated on the deliverable file written by
                    Mauzoun.</p>
                <p>– Pricing and timeline of any rounds of changes, whether inclusive or additional to the approved
                    quotation,
                    are subject to the scope of changes requested, and will be determined upon the Mauzoun Team’s
                    discretion</p>
            </div>

            <div class="guidelines">
                <h5>V. Project Guidelines</h5>
                <p>
                    – This project’s expiry date is on <b>2021/MM/DD</b> regardless of services or rounds of changes
                    fulfilled. Upon
                    project expiry, full pending payment must be paid regardless of project completion status.
                </p>
                <p>
                    – If a client fails to provide feedback on a deliverable within (3) months, then the entire project
                    is considered
                    complete, and the remaining payment will be invoiced. The client will only be able to resume the
                    project
                    with an entirely new quotation, even if it is for the same service.
                </p>
                <p>
                    – The client may place the project on hold for a period no longer than (1) month. Requests for
                    freezing must
                    be communicated to Mauzoun via e-mail only.
                </p>
                <p>
                    – Mauzoun does not keep project archives past the project expiry date and will be unable to
                    supplement or
                    provide any files related to the project past project expiration date.
                </p>
                <p>
                    – The client may only use and display the work that they approve of. Any form of work or prior
                    drafts that the
                    client did not approve for usage cannot be used by the client in any shape or form, under any
                    circumstances.
                </p>
                <p>
                    – Mauzoun reserves the right to showcase the final approved work, all documents pertaining to the
                    work
                    produced by Mauzoun, the Mauzoun creative process, the client's logos, and affiliate logos
                    pertaining to the
                    project, in our portfolio, website, and all other Mauzoun platforms.
                </p>
                <p>
                    – Words are defined as total document word count. Pages refer to the pages of the final deliverable
                    after
                    design implementation, and not the pages of the document’s PDF content blueprint.
                </p>
                <p>
                    – For all recurring monthly services (including but not limited to monthly social media content, or
                    monthly
                    newsletters), each month’s allocated quantity of content is only applicable to that particular
                    month.
                </p>
                <p>
                    Therefore, remaining posts from a previous month do not crossover to the next month and will be
                    considered fully complete.
                </p>
            </div>
            @if(!empty($is_pdf_))
                <div class="footer">
                    <p>VAT Registration 310145806100003</p>
                    <p>C.R. 4030360838</p>
                    <p>P.O. Box 23435, Jeddah, Saudi Arabia</p>
                    <p>Email hello@mauzoun.com</p>
                    <p><b>www.mauzoun.com</b></p>
                </div>
            @endif

            <div class="project">
                <h5>VI. Communication Guidelines</h5>
                <p>
                    – Mauzoun communication hours are from Sundays to Wednesdays, 9am to 5pm, in local Saudi Arabian
                    time (GMT +3).
                </p>
                <p>
                    – The standard response rate is within (3) business days
                </p>
                <p>
                    – E-mail, online calls, and online meetings are our only methods of communication
                </p>
                <p>
                    – E-mail is the most preferred method of communication and will entail faster response.
                </p>
                <p>
                    – Ensure that you “Reply All” when responding to e-mail communications.
                </p>
                <p>
                    – The client must schedule online calls or online meetings (3) business days in advance via an
                    e-mail request
                </p>
                <p>
                    – Scheduling short-notice online meetings is possible via e-mail, but is subject to availability.
                </p>
                <p>
                    – The client ensures appropriate professional behavior when communicating with any member of the
                    Mauzoun Team, and will not contact them via personal communication channels, or contact them for
                    personal reasons outside of work purposes, or contact them outside of working hours.
                </p>
            </div>

            <div class="m-t">
                <h5>VII. Payments & Pricing</h5>
                <p>
                    – All payments made to Mauzoun are strictly non-refundable.
                </p>
                <p>
                    – Approved payment methods are wire transfer, cash payments, and cheques only.
                </p>
                <p>
                    – To begin the project, a 60% down deposit of the total fee must be paid.
                </p>
                <p>
                    – Paying the down payment and all other payments quoted in this quotation is considered a formal
                    approval
                    of this quotation and of all its terms and conditions.
                </p>
                <p>
                    – Upon payment submission, the client must e-mail a proof of payment to Mauzoun via e-mail only.
                    Failure
                    to forward a proof of payment may result in timeline delays.
                </p>
                <p>
                    – Upon paying the down payment, the client cannot change any of the quoted services. Any additional
                    services requested will be quoted in a separate quotation. Any cancelled services must be paid in
                    full.
                </p>
                <p>
                    – After final submission, the remaining 40% must be paid within a maximum of (5) business days.
                </p>
                <p>
                    – Individual discount rates cannot be applied to package discount rates.
                </p>
                <p>
                    – In case of termination or irreconcilable disagreements, the client must pay the full pending
                    amount of the
                    project, regardless of project completion status.
                </p>
            </div>

            <div class="m-t">
                <h5>VIII. Please Forward Payment To:</h5>
                <p><b>– Beneficiary Name:</b> Mauzoun Establishment</p>
                <p><b>– Beneficiary Account Number:</b> 68202684011000</p>
                <p><b>– Bank Country:</b> The Kingdom of Saudi Arabia</p>
                <p><b>– Bank Name:</b> Alinma Bank</p>
                <p><b>– Swift Code:</b> INMASARI</p>
                <p><b>– IBAN:</b> SA68 0500 0068 2026 8401 1000</p>
            </div>

            @if(!empty($is_pdf_))
                <div class="footer">
                    <p>VAT Registration 310145806100003</p>
                    <p>C.R. 4030360838</p>
                    <p>P.O. Box 23435, Jeddah, Saudi Arabia</p>
                    <p>Email hello@mauzoun.com</p>
                    <p><b>www.mauzoun.com</b></p>
                </div>
        @endif
        <!--  -->
            <!--End of subpage-->
        </div>
    </div>
</body>
</html>
