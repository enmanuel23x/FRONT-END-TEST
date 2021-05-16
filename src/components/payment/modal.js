import React from 'react';
import  { Form, Button, Modal, Input } from 'antd';

// Exported Component
const ModalToken = (
    {
        setData,
        visible, 
        next,
        disabled,
        onCancel, 
        loading
    }) =>{
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
    return (
        <Modal
            visible={visible}
            centered
            bodyStyle={{ margin: "auto",  width: "50%"}}
            title={"Confirmacion de token"}
            onCancel={onCancel}
            footer={[
                <Button data-testid="token-cancel" key="back" type="danger" onClick={onCancel}>
                    Cerrar
                    </Button>,
                <Button  
                    key="submit" 
                    onClick={()=>next()} 
                    type="primary" 
                    data-testid="token-next"
                    loading={loading}
                    disabled={disabled}
                    >
                        Continuar
                        </Button>]}
            >
            <Form
                {...layout}
                name="basic"
                >
                <Form.Item
                    label="Token"
                    name="token"
                    >
                    <Input
                    onChange={
                        (data)=>
                            {
                            setData(data.target.value); 
                        }
                    }  
                    />
                </Form.Item>
                </Form>
            </Modal>
    )
}
export default ModalToken