import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import styles from './Form.module.scss';
import Context from '../../context';

function Form(props) {
  const { transactions, setTransactions } = useContext(Context);

  const currentDate = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const transaction = {
      name: data.name,
      amount: data.type === 'income' ? Math.abs(data.amount) : -Math.abs(data.amount),
      type: data.type,
      date: data.date,
    };
    setTransactions([...transactions, transaction]);
    reset();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-block']}>
          <label htmlFor="transaction-name">Name:</label>
          <input
            {...register('name', { required: 'name is required field!' })}
            id="transaction-name"
            type="text"
          />
          {errors?.name && (
            <div className={styles.error} style={{ color: 'red' }}>
              {errors.name.message}
            </div>
          )}
        </div>
        <div className={styles['input-block']}>
          <label htmlFor="transaction-amount">Amount ₴:</label>
          <input
            {...register('amount', { required: 'amount is required field!' })}
            id="transaction-amount"
            type="number"
          />
          {errors?.amount && (
            <div className={styles.error} style={{ color: 'red' }}>
              {errors.amount.message}
            </div>
          )}
        </div>
        <div className={styles['input-radio-block']}>
          <label htmlFor="transaction-type">Type:</label>
          <div className={styles['radio-btns']}>
            <div className={styles['radio-btn']}>
              <input
                {...register('type', { required: 'please select a transaction type!' })}
                id="income"
                className={styles['transaction-type']}
                name="type"
                value="income"
                type="radio"
              />
              <label style={{ color: 'green' }} htmlFor="income">
                income
              </label>
              {errors?.type && (
                <div className={styles.error} style={{ color: 'red' }}>
                  {errors.type.message}
                </div>
              )}
            </div>
            <div className={styles['radio-btn']}>
              <input
                {...register('type', { required: 'please select a transaction type!' })}
                id="expense"
                className={styles['transaction-type']}
                name="type"
                value="expense"
                type="radio"
              />
              <label style={{ color: 'red' }} htmlFor="expense">
                expense
              </label>
            </div>
          </div>
        </div>
        <div className={styles['input-block']}>
          <label htmlFor="transaction-date">Date:</label>
          <input
            {...register('date', { required: 'date is required field!' })}
            id="transaction-date"
            type="date"
            defaultValue={currentDate}
          />
          {errors?.date && (
            <div className={styles.error} style={{ color: 'red' }}>
              {errors.date.message}
            </div>
          )}
        </div>
        <input className={styles['submit-btn']} type="submit" value="Save" />
      </form>
    </>
  );
}

export default Form;
