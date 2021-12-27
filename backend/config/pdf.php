<?php

return [
    'mode' => '',
    'format' => [210, 397],
    'default_font_size' => '12',
    'default_font' => '"alegreya-sans"',
    'margin_left' => 0,
    'margin_right' => 0,
    'margin_top' => 10,
    'margin_bottom' => 40,
    'margin_header' => 0,
    'margin_footer' => 0,
    'orientation' => 'P',
    'title' => 'Laravel mPDF',
    'subject' => '',
    'author' => '',
    'watermark' => '',
    'show_watermark' => false,
    'show_watermark_image' => false,
    'watermark_font' => 'sans-serif',
    'display_mode' => 'fullpage',
    'watermark_text_alpha' => 0.1,
    'watermark_image_path' => '',
    'watermark_image_alpha' => 0.2,
    'watermark_image_size' => 'D',
    'watermark_image_position' => 'P',
    'custom_font_dir' => base_path('resources/fonts/'), // don't forget the trailing slash!
    'custom_font_data' => [
        'alegreya-sans' => [
            'R' => 'AlegreyaSans-Light.ttf',    // regular font
            'B' => 'AlegreyaSans-Bold.ttf',       // optional: bold font
            'I' => 'AlegreyaSans-LightItalic.ttf',     // optional: italic font
            'M' => 'AlegreyaSans-Medium.ttf',     // optional: italic font
            'BI' => 'AlegreyaSans-SemiBold.ttf' // optional: bold-italic font
        ],
        'alegreya' => [
            'R' => 'Alegreya-Medium.ttf',    // regular font
            'B' => 'Alegreya-Bold.ttf',       // optional: bold font
            'I' => 'Alegreya-LightItalic.ttf',     // optional: italic font
            'BI' => 'Alegreya-SemiBold.ttf', // optional: bold-italic font
            'M' => 'Alegreya-Medium.ttf' // optional: bold-italic font
        ],
        'eurostile' => [
            'R' => 'EurostileNormal.ttf',    // regular font
            'B' => 'EurostileBold.ttf',       // optional: bold font
            'I' => 'EurostileExtended.ttf',     // optional: italic font
            'BI' => 'EurostileOblique.ttf' // optional: bold-italic font
        ]
        // ...add as many as you want.
    ],
    'auto_language_detection' => false,
    'temp_dir' => rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR),
    'pdfa' => false,
    'pdfaauto' => false,
    'use_active_forms' => false,
];
