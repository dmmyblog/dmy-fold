<?php
/**
 * Plugin Name: 大绵羊折叠框
 * Description: 一个为 Gutenberg 编辑器区块，打造的内容折叠区块插件，让你轻松创建可展开/收起的内容模块，页面更整洁，阅读更友好。
 * Version: 1.1.1
 * Author: DMY
 */

function dmy_accordion_block_init() {
    // 注册区块脚本
    wp_register_script(
        'dmy-accordion-block',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    // 注册前端脚本
    wp_register_script(
        'dmy-accordion-frontend',
        plugins_url('build/frontend.js', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/frontend.js'),
        true
    );

    wp_register_style(
        'dmy-accordion-block-style',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    // 注册编辑器样式
    wp_register_style(
        'dmy-accordion-block-editor-style',
        plugins_url('build/index.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // 注册区块类型
    register_block_type('dmy/accordion', array(
        'editor_script' => 'dmy-accordion-block',
        'editor_style'  => 'dmy-accordion-block-editor-style',
        'style'         => 'dmy-accordion-block-style',
        'view_script'   => 'dmy-accordion-frontend',
        'attributes' => [
            'title' => ['type' => 'string'],
            'content' => [
                'type' => 'string',
                'source' => 'html',
                'selector' => '.accordion-content p'
            ],
            'isOpen' => ['type' => 'boolean', 'default' => false],
            'headerColor' => ['type' => 'string', 'default' => '#e6f0ff']
        ]
    ));

    // 添加自定义区块分类
    if (function_exists('register_block_type')) {
        add_filter('block_categories_all', function($categories, $post) {
            return array_merge(
                $categories,
                array(
                    array(
                        'slug' => 'dmy-zhedie',
                        'title' => __('DMY 折叠模块', 'dmy-accordion'),
                    ),
                )
            );
        }, 10, 2);
    }
}
add_action('init', 'dmy_accordion_block_init');
