import { Router, IRouter, Request, Response } from 'express';
import { getCompanyDb } from '../../modules/common/plugins/Dbmanager';
import { getOrderModel } from '../../modules/eliminar';

export const getOrders = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const companyDb = await getCompanyDb(companyId);

  const Order = getOrderModel(companyDb);
  const orders = await Order.create({
    customerId: '1',
    items: [
      { productId: '1', quantity: 1, unitPrice: 100 },
      { productId: '2', quantity: 2, unitPrice: 200 },
    ],
    totalAmount: 500,
    status: 'pendiente',
  });
  return res.json(orders);
};

class Routes {
  public router: IRouter;

  constructor() {
    this.router = Router();
    this.setup();
  }

  private setup(): void {
    this.router.get('/', (req: Request, res: Response) => {
      res.respond({ message: 'Hola mundo' }, 200);
    });
    this.router.get('/orders', getOrders);
  }
}
export default new Routes();
