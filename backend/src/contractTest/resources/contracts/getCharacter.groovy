package contracts

org.springframework.cloud.contract.spec.Contract.make {
    request {
        method 'GET'
        url '/api/characters/1'
    }
    response {
        status 200
        body(
                id: 1,
                nickname: "Paladin",
                avatar: "https://example.com/avatar-paladin.png"
                // Добавьте другие поля по необходимости
        )
        headers {
            contentType(applicationJson())
        }
    }
}
