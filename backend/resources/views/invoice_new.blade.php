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
                <h1 class="h1 m-0">فاتورة ضريبية  </h1>
                <h2 class="m-0 h2">Tax Invoice</h2>
            </div>
            <div class="invoice">
                <div class="invoice-table">
                    <table class="maintable table-border">
                        <tbody>
                        <tr>
                            <td class="w-200">Invoice Number</td>
                            <td class="w-200">100</td>
                            <td class="text-right w-200">100</td>
                            <td class="text-right w-200">رقم الفاتورة</td>
                        </tr>
                        </tbody>
                    </table>

                    <table class="maintable table-border mt-5">
                        <tbody>
                        <tr>
                            <td class="w-25">Invoice Issue Date:</td>
                            <td class="w-25">25/4/2022</td>
                            <td class="text-right w-25">25/4/2022</td>
                            <td class="text-right w-25">تاريخ إصدار الفاتورة  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Date of Supply</td>
                            <td class="w-25">25/4/2022</td>
                            <td class="text-right w-25">25/4/2022</td>
                            <td class="text-right w-25"> تاريخ التوريد   </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="invoice-qrcode">
{{--                    <img src="images/qr-code.png" width="200" style="float: right;">--}}
                </div>
            </div>
            <div style="clear: both;"></div>
            <!-- info  -->
            <div class="info">
                <div class="seller">
                    <table class="maintable table-border">
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left">Seller</th>
                            <th class="text-right" colspan="2">تاجر </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="w-25">Name:</td>
                            <td class="w-25">asdjfnasdfn</td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اسم </td>
                        </tr>
                        <tr>
                            <td class="w-25">Building No:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:لا للبناء </td>
                        </tr>
                        <tr>
                            <td class="w-25">Street Name:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اسم الشارع  </td>
                        </tr>
                        <tr>
                            <td class="w-25">District:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:يصرف: </td>
                        </tr>
                        <tr>
                            <td class="w-25">City:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:امدينة </td>
                        </tr>
                        <tr>
                            <td class="w-25">Country:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:ادولة </td>
                        </tr>
                        <tr>
                            <td class="w-25">Postal Code:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:رمز بريدي   </td>
                        </tr>
                        <tr>
                            <td class="w-25">Additional No:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:ارقم إضافي </td>
                        </tr>
                        <tr>
                            <td class="w-25">VAT Number:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اظريبه الشراء </td>
                        </tr>
                        <tr>
                            <td class="w-25">Other Seller ID:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">: معرف البائع الآخر  </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="buyer">
                    <table class="maintable table-border">
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left">Buyer:</th>
                            <th class="text-right" colspan="2">تمشتر: </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="w-25">Name:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اسم  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Building No:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:لا للبناء </td>
                        </tr>
                        <tr>
                            <td class="w-25">Street Name:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اسم الشارع</td>
                        </tr>
                        <tr>
                            <td class="w-25">District:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:يصرف: </td>
                        </tr>
                        <tr>
                            <td class="w-25">City:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:امدينة </td>
                        </tr>
                        <tr>
                            <td class="w-25">Country:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:ادولة </td>
                        </tr>
                        <tr>
                            <td class="w-25">Postal Code:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:رمز بريدي  </td>
                        </tr>
                        <tr>
                            <td class="w-25">Additional No:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:ارقم إضافي </td>
                        </tr>
                        <tr>
                            <td class="w-25">VAT Number:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:اظريبه الشراء</td>
                        </tr>
                        <tr>
                            <td class="w-25">Other Buyer ID:</td>
                            <td class="w-25"></td>
                            <td class="w-25"></td>
                            <td  class="text-right w-25">:ممعرف المشتري الآخر </td>
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
                        <th colspan="4" class="text-left">Line Items:</th>
                        <th colspan="4" class="text-right">:البنود </th>
                    </tr>
                    <tr>
                        <td class="w-25 text-center bg">Nature of Good of Service <br>طبيعة الخدمة الجيدة  </td>
                        <td class="w-25 text-center bg">Unit Price <br> سعر الوحدة  </td>
                        <td class="w-25 text-center bg">Quantity <br> كمية  </td>
                        <td class="w-25 text-center bg">Taxable Amount <br> المبلغ الخاضع للضريبة  </td>
                        <td class="w-25 text-center bg">Discount <br> خصم  </td>
                        <td class="w-25 text-center bg">Tax Rate <br> معدل الضريبة  </td>
                        <td class="w-25 text-center bg">Tax Amount <br> قيمة الضريبة  </td>
                        <td class="w-25 text-center bg">Item Subtotal(Including VAT) <br> البند المجموع الفرعي (متضمنًا ضريبة القيمة المضافة)  </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class=" w-25">Item A - البند أ </td>
                        <td class="text-right w-25">200.00 SAR</td>
                        <td class="text-right w-25">1</td>
                        <td class="text-right w-25">200.00 SAR</td>
                        <td class="text-right w-25">0</td>
                        <td class="text-right w-25">15%</td>
                        <td class="text-right w-25">30.00 SAR</td>
                        <td class="text-right w-25">230.00 SAR</td>
                    </tr>
                    <tr>
                        <td class=" w-25">Item B - االبند ب</td>
                        <td class="text-right w-25">350.00 SAR</td>
                        <td class="text-right w-25">2</td>
                        <td class="text-right w-25">700.00 SAR</td>
                        <td class="text-right w-25">0</td>
                        <td class="text-right w-25">15%</td>
                        <td class="text-right w-25">150.00 SAR</td>
                        <td class="text-right w-25">805.00 SAR</td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div class="total-amount">
                <table class="maintable table-border mt-5">
                    <thead>
                    <tr>
                        <th colspan="2" class="text-left">Total Amount:</th>
                        <th colspan="2" class="text-right">:المبلغ الإجمالي  </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="width: 300px"></td>
                        <td style="width:200px">Total(Excluding VAT)</td>
                        <td style="width:200px" class="text-right">الإجمالي (باستثناء ضريبة القيمة المضافة)</td>
                        <td style="width: 100px;" class="text-right">900.00 SAR</td>
                    </tr>
                    <tr>
                        <td style="width: 300px"></td>
                        <td style="width:200px">Discount</td>
                        <td style="width:200px" class="text-right">اخصم  </td>
                        <td style="width: 100px;" class="text-right">0.00 SAR</td>
                    </tr>
                    <tr>
                        <td style="width: 300px"></td>
                        <td style="width:200px">Total Taxable Amount(Excluding VAT)</td>
                        <td style="width:200px" class="text-right">اإجمالي المبلغ الخاضع للضريبة (باستثناء ضريبة القيمة المضافة) </td>
                        <td style="width: 100px;" class="text-right">900.00 SAR</td>
                    </tr>
                    <tr>
                        <td style="width: 300px"></td>
                        <td style="width:200px">Total VAT</td>
                        <td style="width:200px" class="text-right">اإجمالي ضريبة القيمة المضافة  </td>
                        <td style="width: 100px;" class="text-right">135.00 SAR</td>
                    </tr>
                    <tr>
                        <td style="width: 300px"></td>
                        <td style="width:200px">Total Amount Due</td>
                        <td style="width:200px" class="text-right">إجمالي المبلغ المستحق  </td>
                        <td style="width: 100px;" class="text-right">1,035.00 SAR</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--  -->
            <!--End of subpage-->
        </div>
    </div>
</body>
</html>
