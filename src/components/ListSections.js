import React from 'react';
import "../css/list-section.css"

const ListSections = ({ Icon, title, color, selected }) => {
    return (
        <div className={`list__sections__section ${selected && 'section--selected'} `} style={{
            borderBottom: selected && `2px solid ${color}`,
            color: `${selected && color}`
        }}>
            <Icon fontSize='small' />
            <h3>{title}</h3>
        </div>
    )
}

export default ListSections