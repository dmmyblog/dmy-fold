import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';
import { PanelBody, ColorPalette } from '@wordpress/components';
import './style.css';
import './editor.css';

registerBlockType('dmy/accordion', {
    title: '大绵羊折叠框',
    icon: 'arrow-down-alt2',
    category: 'dmy-zhedie',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: '.dmy-fold-accordion-title',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: '.dmy-fold-accordion-content > p',
        },
        isOpen: {
            type: 'boolean',
            default: false,
        },
        headerColor: {
            type: 'string',
            default: '#e6f0ff'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const { title, content, isOpen, headerColor } = attributes;
        const blockProps = useBlockProps({
            className: `dmy-fold-accordion ${isOpen ? 'is-open' : ''}`
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="标题颜色">
                        <p>状态颜色</p>
                        <ColorPalette
                            colors={[
                                { name: 'Light Blue', color: '#e6f0ff' },
                                { name: 'Light Green', color: '#e6ffe6' },
                                { name: 'Light Pink', color: '#ffe6f0' },
                                { name: 'Light Yellow', color: '#ffffe6' }
                            ]}
                            value={headerColor}
                            onChange={(newColor) => setAttributes({ headerColor: newColor })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="dmy-fold-accordion-header" style={isOpen ? { backgroundColor: headerColor } : {}}>
                        <RichText
                            tagName="p"
                            className="dmy-fold-accordion-title"
                            value={title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder="Enter title..."
                        />
                        <button
                            className="dmy-fold-accordion-toggle"
                            onClick={() => {
                                console.log('Accordion toggle clicked');
                                setAttributes({ isOpen: !isOpen });
                            }}
                        >
                            <Icon icon={isOpen ? chevronUp : chevronDown} />
                        </button>
                    </div>
                    {isOpen && (
                        <div className="dmy-fold-accordion-content">
                            <RichText
                                tagName="p"
                                value={content}
                                onChange={(content) => setAttributes({ content })}
                                placeholder="Enter content..."
                            />
                        </div>
                    )}
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { title, content, headerColor } = attributes;
        const blockProps = useBlockProps.save({
            className: 'dmy-fold-accordion'
        });

        return (
            <div {...blockProps}>
                <div className="dmy-fold-accordion-header" style={{ backgroundColor: headerColor }}>
                    <RichText.Content
                        tagName="p"
                        className="dmy-fold-accordion-title"
                        value={title}
                    />
                    <button className="dmy-fold-accordion-toggle">
                        <Icon icon={chevronDown} />
                    </button>
                </div>
                <div className="dmy-fold-accordion-content">
                    <RichText.Content
                        tagName="p"
                        value={content}
                    />
                </div>
            </div>
        );
    },
});
