import prisma from "../config/database";
export default async function calculateAmount(orders: any) {
    let amount = 0;
    if (orders.length >= 1) {
        for (let i = 0; i < orders.length; i++) {
            let item = await prisma.carparts.findUnique({
                where: { CustomLabel: orders[i].customLabel }, select: { Price: true },
            });
            amount += item.Price;
        }
    }
    return amount;
}