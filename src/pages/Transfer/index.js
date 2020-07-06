import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FiCreditCard,
  FiDollarSign,
  FiChevronsRight,
  FiChevronsLeft,
} from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

import formatMoney from '../../utils/formatMoney';
import Button from '../../components/Button';

import { Container, Content, UserData, Cash, ContainerForm } from './styles';

const Deposits = () => {
  const [formData, setFormData] = useState({
    amount: 0,
    accountType: 0,
    toCPF: '',
    timestamp: '',
    scheduled: true,
  });

  const { addToast } = useToast();

  const user = JSON.parse(localStorage.getItem('@RangoLivre:user'));

  const token = localStorage.getItem('@RangoLivre:token');

  let meal = user.meal_allowance_balance;
  let regular = user.regular_balance;
  let total = regular + meal;

  function handleChangeInput(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmitTransfer(event) {
    event.preventDefault();

    const { amount, accountType, toCPF, scheduled, timestamp } = formData;

    let response = await api.post(
      'transactions',
      {
        amount,
        account_type: Number(accountType),
        to_CPF: toCPF,
        scheduled: !scheduled,
        timestamp: Number(Date.parse(timestamp)),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      addToast({
        type: 'success',
        title: 'Tranferêcia realizada',
        description:
          'Tranferêcia realizado com sucesso, atualizando valores, faça login novamente',
      });

      setTimeout(() => {
        localStorage.removeItem('@RangoLivre:purchase');
        localStorage.removeItem('@RangoLivre:token');
        localStorage.removeItem('@RangoLivre:user');

        document.location.reload(true);
      }, 2000);
    }
  }

  return (
    <>
      <Container>
        <Content>
          <UserData>
            <h2>Bem vindo(a), {user.name}</h2>
            <Cash>
              <div>
                <FiCreditCard size={20} />
                <span>Mercado Vale</span>
              </div>
              <span>{formatMoney(meal)}</span>
            </Cash>

            <Cash>
              <div>
                <FiDollarSign size={20} />
                <span>Mercado Pago</span>
              </div>
              <span>{formatMoney(regular)}</span>
            </Cash>

            <div className="total">
              <p>Saldo total {formatMoney(total)}</p>
            </div>

            <div className="historic-transfer">
              <Link to="/transfer-money">
                Realizar transferencia
                <FiChevronsRight size={20} />
              </Link>
            </div>
          </UserData>

          <Link to="/home-client">
            <span className="backToDetail">
              <FiChevronsLeft />
              Voltar
            </span>
          </Link>

          <ContainerForm>
            <form onSubmit={handleSubmitTransfer}>
              <input
                type="number"
                name="amount"
                placeholder="Valor da transferência. Ex: 300"
                maxLength="3"
                onChange={handleChangeInput}
              />

              <div>
                <input
                  type="radio"
                  name="account_type"
                  value="0"
                  id="type0"
                  checked
                />
                <label htmlFor="type0">Mercado Pago</label>
                <input type="radio" name="account_type" value="1" id="type1" />
                <label htmlFor="type0">Mercado Vale</label>
              </div>

              <input
                type="text"
                name="to_CPF"
                placeholder="CPF de quem irá receber"
              />

              <input type="date" name="timestamp" />

              <div>
                <input type="checkbox" name="scheduled" id="scheduled" />
                <label htmlFor="scheduled">Agendar transferência</label>
              </div>

              <Button type="submit">Transferir</Button>
            </form>
          </ContainerForm>
        </Content>
      </Container>
    </>
  );
};

export default Deposits;
