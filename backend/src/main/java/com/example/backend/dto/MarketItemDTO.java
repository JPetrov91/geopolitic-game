package com.example.backend.dto;

public class MarketItemDTO {
    private Long id;
    private String name;
    private Integer quantity;
    private Double price;
    private String sellerName;

    public MarketItemDTO() {
    }

    public MarketItemDTO(Long id, String name, Integer quantity, Double price, String sellerName) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.sellerName = sellerName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }
}
