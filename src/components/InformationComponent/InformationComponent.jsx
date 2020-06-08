import React from 'react'
import classes from './InformationComponent.module.scss'

export default function InformationComponent(props) {
    return (
        <div className={classes.InformationComponent}>
            <h1>Компании и отзывы о них</h1>
            <div className={classes.Information}>
                {props.commentStatus?<h3>Добавьте коментарий</h3>:<h3>Название компании</h3>}
                <h3>Дата</h3>
            </div>
        </div>
    )
}
