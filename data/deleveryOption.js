export const deleveryOptions = [
    {
        id : '1',
        deleveryDays: 7,
        priceCents: 0,
    },
    {
        id : '2',
        deleveryDays: 3,
        priceCents: 499,
    },
    {
        id : '3',
        deleveryDays: 1,
        priceCents: 999,
    }
]

export function getOption(deliveryOptionId){
    const deleveryOption = deleveryOptions.find(option => option.id === deliveryOptionId);
    return deleveryOption || deleveryOption[0];
  }