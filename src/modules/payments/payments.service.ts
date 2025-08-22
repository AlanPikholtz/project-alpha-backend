import { FastifyInstance } from 'fastify';
import { ERROR_TYPES } from '../../constants/errorTypes.js';
import { CustomError } from '../../types/errors.js';
import { PaymentsResponse } from '../../types/payments.js';
import {
  deletePayment,
  fetchCountPayments,
  fetchPaymentById,
  fetchPayments,
  insertPayment,
  putPayment,
} from './payments.repository.js';

export async function getAllPayments(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
  page: number,
): Promise<PaymentsResponse> {
  const payments = await fetchPayments(fastify, limit, offset);
  const totalPayments = await fetchCountPayments(fastify);
  const totalPages = !limit ? 1 : Math.ceil(totalPayments / limit);

  return {
    data: payments,
    total: totalPayments,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function getPaymentById(fastify: FastifyInstance, id: number) {
  const payment = await fetchPaymentById(fastify, id);

  if (!payment) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró pago con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  return payment;
}

export async function createPayment(fastify: FastifyInstance, data: any): Promise<{ id: number }> {
  const result = await insertPayment(fastify, data);
  return { id: result.insertId };
}

export async function updatePayment(fastify: FastifyInstance, id: number, data: any): Promise<{ succeeded: boolean }> {
  const payment = await fetchPaymentById(fastify, id);

  if (!payment) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró pago con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await putPayment(fastify, id, data);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al actualizar el pago ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}

export async function deletePaymentById(fastify: FastifyInstance, id: number): Promise<{ succeeded: boolean }> {
  const payment = await fetchPaymentById(fastify, id);

  if (!payment) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró pago con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await deletePayment(fastify, id);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al eliminar el pago ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}
