import React from 'react';
import { Link } from 'react-router-dom'
import {FiCreditCard, FiDollarSign, FiChevronsLeft, FiTruck, FiClock, FiCheck } from 'react-icons/fi'

import { Container, Content, UserData, Cash, ContainerDish, PurchaseDetails, CheckOut, SelectPaymentMethod } from './styles';

import SelectDish from '../../components/SelectDish'

const ShoppingCart = () => {

  return (
    <>
      <Container>
        <Content>
          <UserData>
              <Cash>
                <div>
                  <FiCreditCard size={20}/>
                  <span>Mercado Vale</span>
                </div>
                <span>R$ 150,00</span>
              </Cash>

              <Cash>
                <div>
                  <FiDollarSign size={20} />
                  <span>Mercado Pago</span>
                </div>
                <span>R$ 150,00</span>

              </Cash>

              <div className='total'>
                <p>Saldo total R$ 300,00</p>
              </div>
          </UserData>

          <Link to='details'>
            <span className='backToDetail'>
              <FiChevronsLeft />
              Voltar
            </span>
          </Link>

          <ContainerDish>
            <SelectDish shoppingCart={true}/>
            <SelectDish shoppingCart={true}/>
            <SelectDish shoppingCart={true}/>

          </ContainerDish>

          <PurchaseDetails>
            <span><FiTruck size={40} />Taxa de entrega: R$ 3,00</span>
            <span><FiDollarSign size={40} />Total: R$ 110,00</span>
            <span><FiClock size={40} />Tempo de entrega: 45 min</span>
          </PurchaseDetails>

          <CheckOut>
            <Link to='shopping-cart'>
              <FiCheck size={20} />
                Finalizar pedido
            </Link>
          </CheckOut>

          <SelectPaymentMethod>
            <div className='paymentMethod active'>
              <h2>Escolha a forma de pagamento</h2>
                  <span>
                    <FiCreditCard size={20}/>
                    Mercado Vale
                  </span>

                  <span>
                    <FiCreditCard size={20}/>
                    Mercado Pago
                  </span>

                  <span>
                    <FiDollarSign size={20}/>
                    Dinheiro
                  </span>

                  <input
                    type="password"
                    name="password"
                    placeholder='Digite sua senha'/>

                  <div className='buttons'>
                    {/* adicionar um form e submit nos btn */}
                    <button   className='btn-confirm'>Confirmar</button>
                    <button className='btn-cancel'>Cancelar</button>
                  </div>

            </div>

          </SelectPaymentMethod>

        </Content>
      </Container>
    </>
  );
};

export default ShoppingCart;