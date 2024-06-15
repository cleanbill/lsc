import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Sync from './sync'
import { describe, expect, it } from 'vitest'


describe('Sync comp should ', () => {

    it('Type in token will make button appear', async () => {

        const overwriteData = () => {

        }
        const data = {};

        render(<Sync overwriteData={overwriteData} data={data} />)
        const tokenInput = screen.getByTestId('sync-token-input') as HTMLInputElement;
        const missingInputButtons = screen.queryByText("Post");
        expect(missingInputButtons).toBeNull(); // Not on page yet....

        await userEvent.click(tokenInput);
        await userEvent.type(tokenInput, 'this-is-a-token');

        const postInputButtons = screen.queryByText("Post");

        expect(tokenInput.value).toContain('this-is-a-token');
        expect(postInputButtons).exist;

    })

    // There should be more tests... but there's isn't.
})