// Need to have the toast container in render and also rerender each time notificationOnClick is called
// not sure how to do it

import notificationOnClick from "./notificationOnClick";
import { screen } from "@testing-library/react";

// This isn't actually testing anything other than calling the function
test('test all notification types', async () => {
    const types = ['info', 'success', 'warning', 'error']
    for (let i = 0; i < types.length; i++) {
        notificationOnClick(types[i], 'test')
    }
})
