import React, { Component } from 'react'

// import classNames from 'classnames';

class CustomSetter extends Component<any, any> {
    render() {
        const { defaultValue, value, onChange } = this.props
        const { editor } = this.props.field

        console.log('CustomSetter', defaultValue, value, onChange, editor)

        return <div>hello world</div>
    }
}

export default CustomSetter
