import { useState } from 'react'
import { Form, Input, Button, Select, Card, Space, message, Modal } from 'antd';
import { countries } from '../data/phones'
const axios = require('../../utils/request').default;
const styles = {
    card: {
        margin: "auto",
        display: "table"
    },
    form: {
        width: 450,
        margin: "auto"
    },
    submit: {
        float: "right"
    }
}

const BalanceComponent = () => {
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        if(!loading){
            setLoading(true)
            const prefix = countries.find( el => el.name == values.prefix).dial_code;
            axios.post('/client/getBalance',{ 
              ...values,
              phone: prefix+values.phone
            }).then( response => {
              Modal.success({content: response.data.message})
              setLoading(false)
            }).catch( err =>{
              message.error(err.response.data.message)
              setLoading(false)
            })
        }else{
            message.error("¡Por favor espere, se esta procesando la solitud anterior!")
        }
    };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle
    rules={[
      {
        required: true,
        message: '¡Por favor seleccione un codigo de area!',
      },
    ]}>
      <Select
        showSearch 
        style={{ width: 150 }}>
        {
          countries.map( el =>{
            return (
            <Select.Option 
              key={el.name}
              value={el.name}>
                {`${el.code} (${el.dial_code}) - ${el.name}`}
                </Select.Option>)
          })
        }
      </Select>
    </Form.Item>
  );
  return (
    <Space direction="vertical" style={{...styles.card}}>
    <Card title="Consultar saldo">
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{...styles.form}}
    >
    
      <Form.Item
        label="Documento"
        name="doc"
        rules={[
          {
            required: true,
            message: '¡Por favor ingrese el documento de identificación!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Número de teléfono"
        rules={[{ required: true, message: '¡Por favor ingrese su número de teléfono!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button 
            loading={loading} 
            type="primary" 
            htmlType="submit"
            style={{...styles.submit}}>
            Enviar
        </Button>
      </Form.Item>
    </Form>
    
    </Card>
  </Space>
  );
};

export default BalanceComponent;