import { useState } from 'react'
import { Form, Input, Button, Select, Card, Space, InputNumber, message } from 'antd';
import { countries } from '../data/phones'
import ModalToken from './modal';
const axios = require('../../utils/request').default;
const styles = {
    card: {
        margin: "auto",
        display: "table"
    },
    form: {
        width: 650,
        margin: "auto"
    },
    submit: {
        float: "right"
    }
}

const PaymentComponent = () => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [visible, setVisible] = useState(false)
    const [token, setToken] = useState(false)
    const [payId, setPayId] = useState("")

    const onConfirm = () => {
      axios.post('/payment',{ 
        token,
        payId
      }).then( response => {
        onCancel()
        message.success(response.data.message)
      }).catch( err =>{
        onCancel()
        message.error(err.response.data.message)
      })
    }
    const onCancel = () => {
      setLoading2(false)
      setVisible(false)
      setDisabled(false)
      setPayId("")
    }
    const onFinish = (values) => {
        if(!loading){
            setLoading(true)
            const prefix_src = countries.find( el => el.name == values.prefix_src).dial_code;
            const prefix_dest = countries.find( el => el.name == values.prefix_dest).dial_code;
            const data = {...values, prefix_src, prefix_dest}
            axios.put('/payment',{ 
              ...values,
              phone_src: prefix_src+values.phone_src,
              phone_dest: prefix_dest+values.phone_dest,
            }).then( response => {
              setVisible(true)
              setLoading(false)
              setPayId(response.data.payId)
            }).catch( err =>{
              message.error(err.response.data.message)
              setLoading(false)
            })
        }else{
            message.error("¡Por favor espere, se esta procesando la solitud anterior!")
        }
    };

  const prefixSelector = (data) =>{
    return (
        <Form.Item name={"prefix_"+data} noStyle
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
                  key={data+el.name}
                  value={el.name}>
                    {`${el.code} (${el.dial_code}) - ${el.name}`}
                    </Select.Option>)
              })
            }
          </Select>
        </Form.Item>
      );
  }
  return (
    <Space direction="vertical" style={{...styles.card}}>
      <ModalToken
        setData={setToken}
        visible={visible}
        next={onConfirm}
        disabled={disabled}
        onCancel={onCancel}
        loading={loading2}
        />
    <Card title="Realizar un pago">
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{...styles.form}}
    >
    
      <Form.Item
        label="Documento de la billetera origen"
        name="doc_src"
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
        name="phone_src"
        label="Número de teléfono billetera origen"
        rules={[{ required: true, message: '¡Por favor ingrese su número de teléfono!' }]}
      >
        <Input addonBefore={prefixSelector("src")} style={{ width: '100%' }} />
      </Form.Item>
    
      <Form.Item
        label="Valor a pagar:"
        name="value"
        rules={[
          {
            required: true,
            message: '¡Por favor ingrese el valor a recargar!',
          },
        ]}
      >
        <InputNumber
            min="0.01"
            step="0.01"
            stringMode
        />
      </Form.Item>
      <Form.Item
        label="Documento de la billetera destino"
        name="doc_dest"
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
        name="phone_dest"
        label="Número de teléfono billetera detino"
        rules={[{ required: true, message: '¡Por favor ingrese su número de teléfono!' }]}
      >
        <Input addonBefore={prefixSelector("dest")} style={{ width: '100%' }} />
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

export default PaymentComponent