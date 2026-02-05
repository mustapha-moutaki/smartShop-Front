const OrderForm = ({ promocodes, clients, items }) => {
  return (
    <div>
      <form>

        <label>choose the client</label>
        <select>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      

        <label>promocode</label>
        <select>
          {promocodes.map((promo) => (
            <option key={promo.id} value={promo.id}>
              {promo.code}
            </option>
          ))}
        </select>

        <label>items</label>
        {items.map((item) => (
          <div key={item.id}>
            <input type="checkbox" value={item.id} />
            <span>{item.name}</span>
          </div>
        ))}

      </form>
    </div>
  );
};

export default OrderForm;
