<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Mauzoun QT2021MMDDNN Client</title>
    <style>
        @font-face {
            font-family: 'Merriweather', serif;
            /*src: url('vendor/mpdf/ttfonts/Merriweather-Bold.ttf');*/
        }
        body {
            width: 100%;
            /*height: 100%;*/
            margin: 0;
            padding: 0;
            margin-left: -20px;
            background-color: #fff;
            font:9pt "Merriweather";
        }
        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-family: 'Merriweather', serif;
            font-family: 'Shippori Antique', sans-serif;
            font-weight: 900;
        }
        .page {
            width: 290mm;
            /*height: 400mm;*/
            /*min-height: 297mm;*/
            /*padding: 5mm; /*20mm*/
            margin: 10mm auto;
            margin-top: 7px;
        }
        .subpage {
            /*height: 287mm;*/
            /*padding: 5px;*/
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
        }

        .logo{
            /*padding-left: 60%;*/
            width: 100%;
            text-align: center;
        }
        table {
            width: 100%;
            line-height: 16pt;
            text-align: left;
            /*border-spacing: 0;*/
            border-collapse: collapse;
        }
        .maintable{
            border:1px solid #6b6b6b;
        }
        .maintable th{
            border : 1px solid #6b6b6b;
            font-size:14px;
            line-height:10px;
            /*text-align: center;*/
            padding: 12px;
            background-color: #999999;
        }
        .maintable td{
            border: 1px solid #6b6b6b;
            font-size:14px;
            /*text-align: center;*/
        }
        .text-right{
            text-align: right !important;
        }
        .text-left{
            text-align: left !important;
        }
        .table-border{
            border: 2px solid #6b6b6b !important;
        }
        .invoice{
            width: 1050px;
        }
        .invoice-table{
            width: 700px;
            float: left;
            margin-top: 70px;
        }
        .invoice-qrcode{
            width: 200px;
            float: right;
            margin-top: -50px;
            border: 2px solid #6b6b6b;
        }
        .w-25{
            width: 100px !important;
            overflow-wrap: anywhere;
        }
        .w-200{
            width: 200px;
        }
        .w-50{
            width: 77px;
            /*overflow-wrap: anywhere;*/
        }
        .mt-5{
            margin-top: 50px !important;
        }
        .m-0{
            margin-top: 0px;
            margin-bottom: 0px;
        }
        .h2{
            color: #6b6b6b;
            font-size: 17px;
        }
        .info{
            width: 1050px;
            margin-top: 70px !important;
        }
        .seller{
            width: 491px;
            float: left;
        }
        .buyer{
            width: 491px;
            float: right;
        }
        .text-center{
            text-align: center !important;
        }
        .bg{
            background-color: #727272;
            color: #fff;
            font-weight: bold;
        }
        .line-item{
            margin-top: 60px !important;
        }
        .total-amount{
            margin-top: 60px !important;
        }
        .h1{
            color: #6b6b6b;
            font-size: 15px;
        }
    </style>
</head>
<body>
<div class="book">
    <div class="page">
        <div class="subpage">
            <div class="logo">
                <img src="{{public_path('images/main-logo.png')}}" height="100px">
                <h1 class="h1 m-0">???????????? ????????????  </h1>
                <h2 class="m-0 h2">Tax Invoice</h2>
            </div>
            <div class="invoice">
                <div class="invoice-table">
                    <table class="maintable table-border">
                        <tbody>
                        <tr>
                            <td class="w-200">Invoice Number</td>
                            <td class="w-200">{{$invoice->sr_no}}</td>
                            <td class="text-right w-200">{{$invoice->sr_no}}</td>
                            <td class="text-right w-200">?????? ????????????????</td>
                        </tr>
                        </tbody>
                    </table>

                    <table class="maintable table-border mt-5">
                        <tbody>
                        <tr>
                            <td class="w-25">Invoice Issue Date:</td>
                            <td class="w-25">{{\Carbon\Carbon::parse($invoice->date)->format('d/m/Y')}}</td>
                            <td class="text-right w-25">{{\Carbon\Carbon::parse($invoice->date)->format('d/m/Y')}}</td>
                            <td class="text-right w-25">?????????? ?????????? ????????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Invoice Due Date:</td>
                            <td class="w-25">{{\Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y')}}</td>
                            <td class="text-right w-25">{{\Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y')}}</td>
                            <td class="text-right w-25"> :?????????? ???????????? ????????????????    </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="invoice-qrcode">
                    @if(!empty($is_pdf))
                        <img src="{{$qrcode}}" height="200px">
                    @else

                        <img class="web-logo" src="{{ asset('public/images/main-logo.png')}}" height="130px">
                        <br/>
                        <br/>

                        {!! QrCode::generate($invoice->report_url . '/' . ($request->status ?? ($status ?? ''))); !!}
                    @endif
                </div>
            </div>
            <div style="clear: both;"></div>
            <!-- info  -->
            <div class="info">
                <div class="seller">
                    <table class="maintable table-border">
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left" style="color: white">Seller</th>
                            <th class="text-right" colspan="2" style="color: white">?????????????? ????????????  </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="w-25">Name:</td>
                            <td class="w-25">Mauzoun Establishment</td>
                            <td class="text-right w-25"> ?????????? ?????????? ?????????????? ????????????????  </td>
                            <td  class="text-right w-25">:??????????  </td>
                        </tr>
                        {{--<tr>
                            <td class="w-25">Building No:</td>
                            <td class="w-25">8603 </td>
                            <td class="text-right w-25">????????</td>
                            <td  class="text-right w-25">: ?????? ????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Street Name:</td>
                            <td class="w-25">Alanbari</td>
                            <td class="text-right w-25">??????????????</td>
                            <td  class="text-right w-25">:?????? ????????????  </td>
                        </tr>--}}
                        <tr>
                            <td class="w-25">District:</td>
                            <td class="w-25">Rawdah</td>
                            <td class="text-right w-25">????????????</td>
                            <td  class="text-right w-25">:???????? </td>
                        </tr>
                        <tr>
                            <td class="w-25">City:</td>
                            <td class="w-25">Jeddah</td>
                            <td class="text-right w-25">??????</td>
                            <td  class="text-right w-25">:?????????????? </td>
                        </tr>
                        <tr>
                            <td class="w-25">Country:</td>
                            <td class="w-25">Saudi Arabia</td>
                            <td class="text-right w-25">?????????????? ?????????????? ????????????????</td>
                            <td  class="text-right w-25">:???????????? </td>
                        </tr>
                        {{--<tr>
                            <td class="w-25">Postal Code:</td>
                            <td class="w-25">-</td>
                            <td class="text-right w-25">-</td>
                            <td  class="text-right w-25">: ?????????? ??????????????  </td>
                        </tr>--}}
                        <tr>
                            <td class="w-25">VAT Number:</td>
                            <td class="w-25">310145806100003</td>
                            <td class="text-right w-25">??????????????????????????????</td>
                            <td  class="text-right w-25">: ?????? ?????????? ?????????? ???????????? ??????????????  </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="buyer">
                    <table class="maintable table-border">
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left" style="color: white">Buyer:</th>
                            <th class="text-right" colspan="2" style="color: white"> :???????????????? ??????????????  </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="w-25">Name:</td>
                            <td class="w-25">{{$invoice->customer->name}}</td>
                            <td class="text-right w-25">{{$invoice->customer->name_arabic}}</td>
                            <td  class="text-right w-25">:?????????? </td>
                        </tr>
                        <tr>
                            <td class="w-25">Brand Name:</td>
                            <td class="w-25">{{$invoice->billing_company_name}}</td>
                            <td class="text-right w-25">{{$invoice->billing_company_name_arabic}}</td>
                            <td  class="text-right w-25">:?????? ?????????????? </td>
                        </tr>
                        <tr>
                            <td class="w-25">Building No:</td>
                            <td class="w-25">{{$invoice->billing_building_no}}</td>
                            <td class="text-right w-25">{{$invoice->billing_building_no_arabic}}</td>
                            <td  class="text-right w-25">: ?????? ????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Street Name:</td>
                            <td class="w-25">{{$invoice->billing_street}}</td>
                            <td class="text-right w-25">{{$invoice->billing_street_arabic}}</td>
                            <td  class="text-right w-25">:?????? ????????????</td>
                        </tr>
                        <tr>
                            <td class="w-25">District:</td>
                            <td class="w-25">{{$invoice->billing_district}}</td>
                            <td class="text-right w-25">{{$invoice->billing_district_arabic}}</td>
                            <td  class="text-right w-25">: ????????   </td>
                        </tr>
                        <tr>
                            <td class="w-25">City:</td>
                            <td class="w-25">{{$invoice->billing_city}}</td>
                            <td class="text-right w-25">{{$invoice->billing_city_arabic}}</td>
                            <td  class="text-right w-25">:??????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Country:</td>
                            <td class="w-25">{{$invoice->billing_country}}</td>
                            <td class="text-right w-25">{{$invoice->billing_country_arabic}}</td>
                            <td  class="text-right w-25">:????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Postal Code:</td>
                            <td class="w-25">{{$invoice->billing_zip_code}}</td>
                            <td class="text-right w-25">{{$invoice->billing_zip_code}}</td>
                            <td  class="text-right w-25">: ?????????? ??????????????  </td>
                        </tr>
                        <tr>
                            <td class="w-25">VAT Number:</td>
                            <td class="w-25">{{$invoice->billing_vat_number}}</td>
                            <td class="text-right w-25">{{$invoice->billing_vat_number_arabic}}</td>
                            <td  class="text-right w-25">: ?????? ?????????? ?????????? ???????????? ??????????????  </td>
                        </tr>

                        <tr>
                            <td class="w-25">CR Number:</td>
                            <td class="w-25">{{$invoice->billing_cr_number}}</td>
                            <td class="text-right w-25">{{$invoice->billing_cr_number_arabic}}</td>
                            <td  class="text-right w-25">: ?????? ?????????? ??????????????  </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- line items -->
            <div class="line-item">
                <table class="maintable table-border mt-5">
                    <thead>
                    <tr>
                        <th colspan="3" class="text-left" style="color: white">Line Items:</th>
                        <th colspan="3 " class="text-right" style="color: white"> :???????????? ???????????? ???? ????????????   </th>
                    </tr>
                    <tr>
                        <td class="w-25 text-center bg">Nature of Good or Service <br> ???????????? ?????????? ???? ??????????????  </td>
                        <td class="w-25 text-center bg">Unit Price <br> ?????? ????????????  </td>
                        <td class="w-25 text-center bg">Quantity <br> ????????????  </td>
                        <td class="w-25 text-center bg">Discount <br> ??????????  </td>
                        <td class="w-25 text-center bg">Tax Amount <br>  ???????? ?????????????? </td>
                        <td class="w-25 text-center bg">Item Subtotal(Including VAT) <br> ?????????? ?????????????? ???????????? (?????????????? ???????? ?????????????? ??????????????) </td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($invoice->details as $index => $detail)
                    <tr>
                        <td class=" w-25">
                        {{$detail->item}}
                        </td>
                        <td class="text-right w-25">{{$detail->price}} SAR</td>
                        <td class="text-right w-25">{{$detail->qty}}</td>
                        <td class="text-right w-25">{{$detail->discount}}</td>
                        <td class="text-right w-25">{{$detail->tax_amount}} SAR</td>
                        <td class="text-right w-25">{{$detail->total}} SAR</td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>


            <div class="total-amount">
                <table class="maintable table-border mt-5">
                    <thead>
                    <tr>
                        <th colspan="2" style="text-align: left;color:white">Total Amount</th>
                        <th colspan="2" style="text-align: right;color:white">???????????? ????????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($invoice->custom_fields as $custom_field)
                    <tr>
                        <td style="width:40%"></td>
                        <td style="width:20%">{{$custom_field->name}}</td>
                        <td style="width:20%" class="text-right">{{$custom_field->name_arabic}}</td>
                        <td style="width: 20%" class="text-right">{{$custom_field->value}} SAR</td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            <div>
                {!! $invoice->notes !!}
            </div>
            <!--  -->
            <!--End of subpage-->
        </div>
    </div>
</body>
</html>
