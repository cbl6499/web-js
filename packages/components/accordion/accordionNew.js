// Accordion component

'use strict';

/**
 * Accordion is build on top of the aria attributes by the w3c example:
 *     https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
 *
 * @example
 * <div id="accordion">
 *    <section class="collapse">
 *        <h4 id="accordion-title-1">
 *            <button id="accordion-button-1" aria-expanded="false" aria-controls="accordion-body-1">
 *                Header 1
 *            </button>
 *        </h4>
 *
 *        <div id="accordion-body-1" aria-hidden="true" aria-labelledby="accordion-button-1">
 *            Content 1
 *        </div>
 *    </section>
 *
 *    <section class="collapse">
 *        <h4 id="accordion-title-2">
 *            <button id="accordion-button-2" aria-expanded="false" aria-controls="accordion-body-2">
 *                Header 2
 *            </button>
 *        </h4>
 *
 *        <div id="accordion-body-2" aria-hidden="true" aria-labelledby="accordion-button-2">
 *            Content 2
 *        </div>
 *    </section>
 * </div>
 *
 * import Accordion from '@sulu/web/packages/components/accordion/accordion';
 * var component = new Accordion();
 * component.initialize(document.getElementById('accordion'), {});
 *
 * @param {HTMLElement} el
 * @param {object} options
 */
class AccordionNew {
    /**
     * @param {HTMLElement} el
     * @param {object} options
     */

    initialize(el, options) {
        this.accordion = {};

        this.accordion.el = el;
        this.accordion.items = [];

        for (let i = 0; i < el.children.length; i++) {
            const button = el.children[i].querySelector('[aria-expanded][aria-controls]');

            this.accordion.items.push({
                container: el.children[i],
                button: button,
                body: document.getElementById(button.getAttribute('aria-controls')),
            });
        }

        this.accordion.modifier = options.modifier || '--open';
        this.accordion.firstAccordionItemClass = this.accordion.items[0].container.classList[0] || '';
        this.accordion.accordionItemActiveClass = this.accordion.firstAccordionItemClass + this.accordion.modifier;

        this.accordion.addClickListenersToAccordionButtons();
    }

    addClickListenersToAccordionButtons() {
        this.accordion.items.forEach((item) => {
            event.preventDefault();
            event.stopPropagation();
            this.accordion.toggle(item);
        });
    }

    /**
     * @param {object} item
     */
    toggle(item) {
        for (let i = 0; i < this.accordion.items.length; i++) {
            if (this.accordion.items[i].container !== item.container) {
                this.accordion.items[i].container.classList.remove(this.accordion.accordionItemActiveClass);
                this.accordion.items[i].body.setAttribute('aria-hidden', 'true');
                this.accordion.items[i].button.setAttribute('aria-expanded', 'false');
            }
        }

        // Toggle current item
        item.container.classList.toggle(this.accordion.accordionItemActiveClass);
        this.accordion.toggleAttribute(item.button, 'aria-expanded');
        this.accordion.toggleAttribute(item.body, 'aria-hidden');
    }

    /**
     * @param {HTMLElement} element
     * @param {string} attributeName
     */
    toggleAttribute(element, attributeName) {
        element.setAttribute(
            attributeName,
            element.getAttribute(attributeName) === 'true'
                ? 'false'
                : 'true'
        );
    }

    /**
     * @param {HTMLElement} el
     * @param {object} options
     * @returns {object}
     */
    static create(el, options) {
        const accordion = new AccordionNew();
        accordion.initialize(el, options);

        return accordion;
    }
}

export default AccordionNew;
