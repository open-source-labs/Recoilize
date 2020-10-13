import React from 'react';
import { render, cleanup, findByTestId } from '@testing-library/react';
// import prop object being passed down to metric graphs to be tested
describe('Metrics graph testing', () => {
    afterEach(cleanup);
    describe('shape of props being passed down should match ', () => {
        // define a mock object of the props being passed down to match against
        const testObject = {};
        xit();
        expect(/*imported object*/).toMatchObject(testObject);
    });
})