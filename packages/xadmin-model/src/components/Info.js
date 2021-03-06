import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Icon from 'react-fontawesome'
import { StoreWrap, app } from 'xadmin'
import { convert as schemaConvert } from 'xadmin-form/lib/schema'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Panel, Well, ButtonFormGroup, HelpBlock, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'

import { ModelWrap } from '../base'
import { Item } from './items'

const FieldGroup = ({ label, field, children }) => {
  const groupProps = {}
  const attrs = field.attrs || {}
  const help = field.description || field.help
  const size = (field.option && field.option.groupSize) || attrs.groupSize || { 
    label: {
      sm: 4, md: 3, lg: 2 
    },
    control: {
      sm: 8, md: 9, lg: 10
    }
  }

  if (attrs.bsSize) {
    groupProps['bsSize'] = attrs.bsSize
  }
  if (attrs.bsStyle) {
    groupProps['bsStyle'] = attrs.bsStyle
  }

  const controlComponent = children ? children : (<FormControl {...attrs} />)
  
  return (
    <FormGroup {...groupProps}>
      <Col key={0} componentClass={ControlLabel} {...size.label}>
        {label}
      </Col>
      <Col key={1} {...size.control}>
        {controlComponent}
        <FormControl.Feedback />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
    )
}

class ModelInfo extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      record: _.omitBy({ ...this.props.data }, _.isNil)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ record: _.omitBy({ ...nextProps.data }, _.isNil) })
    }
    if (this.props.id !== nextProps.id) {
      this.props.getItem(nextProps.id)
    }
  }

  renderFields() {
    const { title, model, ...formProps } = this.props
    const record = this.state.record

    return schemaConvert(model).fields.map(field => {
      field.option = { ...field.option, ...formProps }
      return (
        <FieldGroup label={field.label} field={field}>
          <Item item={record} field={field.key} selected={false} wrap={
              ({ children, ...props })=><FormControl.Static>{children}</FormControl.Static>
            }/>
        </FieldGroup>)
    })
  }

  render() {
    const { title, model, loading, componentClass, ...formProps } = this.props

    return loading ? 
      (<Panel><Panel.Body><div className="text-center"><Icon name="spinner fa-spin fa-4x"/></div></Panel.Body></Panel>) : 
      (<form className="form-horizontal">
        <Panel><Panel.Body>{this.renderFields()}</Panel.Body></Panel>
      </form>)
  }

}
ModelInfo.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  loading: PropTypes.bool,
  model: PropTypes.object.isRequired,
  getItem: PropTypes.func.isRequired
}

export default ModelWrap('model.item')(ModelInfo)
