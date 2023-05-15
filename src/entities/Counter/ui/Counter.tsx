/* eslint-disable i18next/no-literal-string */
import { FC } from "react";
import { Button } from "@/shared/ui/deprecated/Button";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useCounterActions } from "../model/slice/counterSlice";

export const Counter: FC = () => {
    const counterValue = useCounterValue();
    const { increment, decrement, add } = useCounterActions();

    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    const handleFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid='value-title'>{counterValue}</h1>
            <Button data-testid='increment-btn' onClick={handleIncrement}>
                increment
            </Button>
            <Button data-testid='decrement-btn' onClick={handleDecrement}>
                decrement
            </Button>
            <Button onClick={handleFive}>add</Button>
        </div>
    );
};
