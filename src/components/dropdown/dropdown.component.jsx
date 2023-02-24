import { useRef } from 'react';
import './dropdown.styles.scss';

/* Dropdown components have their positions set dynamically so it appear below
its previous sibling element, this finds the sibling, and sets the position  */
const resetPosition = (currElement, { offset }) => {
    if (currElement == null) return;
    if (offset == null) offset = { x: 0, y: 0 };

    const createPosObj = (element) => {
        return {
            x: element.getBoundingClientRect().left,
            y: element.getBoundingClientRect().top,
            w: element.offsetWidth,
            h: element.offsetHeight
        }
    }
    
    const prevElement = currElement.previousElementSibling;
    
    if (prevElement) {
        const prevElPos = createPosObj(prevElement);
        const currElPos = createPosObj(currElement);

        currElement.style.left = -currElPos.w + offset.x + prevElPos.x + prevElPos.w + 'px';
        currElement.style.top = offset.y + prevElPos.y + prevElPos.h / 2 + 'px';
    }
}

const Dropdown = ({ className, children, ...props }) => {
    const dropdownRef = useRef(null);

    resetPosition(dropdownRef.current, { offset: { x: 0, y: 20  } });

    return (
        <div ref={ dropdownRef } className={`dropdown-container ${ className }`} { ... props }>{ children }</div>
    )
}

export default Dropdown;