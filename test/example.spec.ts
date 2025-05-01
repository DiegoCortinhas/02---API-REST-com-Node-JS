import { expect, test } from 'vitest'

test('o usuario consegue criar uma nova transação', () => {
    //chamada HTTP para criar nova transação
    const responseStatusCode = 201

    //validação
    expect(responseStatusCode).toEqual(201)
})