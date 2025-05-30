import React from "react";
import styled from "styled-components";
import Heading from "../../../shared/ui/Heading";
import { OrderHistory } from "../hooks/fetchOrderHistory";

interface OrderTextProps {
  order: OrderHistory;
}

const formatCurrency = (value: number) => `₦${value.toFixed(2)}`;

export const OrderText: React.FC<OrderTextProps> = ({ order }) => {
  const totalPrice = (order.orderDetails || []).reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <>
      <Block>
        <BlockItem>
          <Heading as="h3">Your Name</Heading>
          <Input type="text" value={order.name || "N/A"} readOnly />
        </BlockItem>
        <BlockItem>
          <Heading as="h3">Order ID</Heading>
          <Input type="text" value={order.id || "N/A"} readOnly />
        </BlockItem>
        <BlockItem>
          <Heading as="h3">Order Status</Heading>
          <Input type="text" value={order.status || "N/A"} readOnly />
        </BlockItem>
      </Block>

      <BlockItem>
        <Heading as="h3">Your Order</Heading>
        <Wrapper>
          {(order.orderDetails || []).map((item, index) => (
            <OrderDetails key={`${item.item}-${index}`}>
              <Item>
                {item.quantityInKg} {item.item}
              </Item>
              <Price>{formatCurrency(item.totalPrice)}</Price>
            </OrderDetails>
          ))}
          <OrderDetails>
            <Item color>Tax</Item>
            <Price>{formatCurrency(0)}</Price>
          </OrderDetails>
          <OrderDetails isShippingFee>
            <Item color>Shipping fee</Item>
            <Price>{formatCurrency(0)}</Price>
          </OrderDetails>
          <OrderDetails>
            <Item color>Total</Item>
            <Price>{formatCurrency(totalPrice)}</Price>
          </OrderDetails>
        </Wrapper>
      </BlockItem>

      <Block>
        <BlockItem>
          <Heading as="h3">Shipping address</Heading>
          <Input type="text" value={order.address || "N/A"} readOnly />
        </BlockItem>
        <BlockItem>
          <Heading as="h3">Date of Order</Heading>
          <Input type="text" value={order.date || "N/A"} readOnly />
        </BlockItem>
        <BlockItem>
          <Heading as="h3">Estimated delivery date</Heading>
          <Input type="text" value={order.deliveryDate || "N/A"} readOnly />
        </BlockItem>
      </Block>
    </>
  );
};

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media (min-width: 768px) {
    gap: 2rem;
    flex-direction: row;
  }
`;

const BlockItem = styled.div`
  width: 100%;
  margin: auto 0;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  min-height: 4rem;
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  box-sizing: border-box;
  margin: 0.314rem 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const OrderDetails = styled.div<{ isShippingFee?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.63rem;
  border-bottom: ${(props) =>
    props.isShippingFee ? "1px solid var(--color-text)" : "none"};
  padding-bottom: ${(props) => (props.isShippingFee ? "1rem" : "0")};
`;

const Item = styled.span<{ color?: boolean }>`
  font-size: var(--font-size-sm);
  color: ${(props) => (props.color ? "var(--color-primary)" : "inherit")};
`;

const Price = styled.span`
  font-size: var(--font-size-sm);
`;

const Wrapper = styled.div`
  padding: 0.63rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
`;
