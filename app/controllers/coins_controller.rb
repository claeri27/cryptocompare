class CoinsController < ApplicationController
  before_action :set_coin, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :update, :destroy, :mine]

  # GET /coins
  def index
    @coins = Coin.all
    # symbols = @coins.map{|coin|coin.symbol}.join(",")

    render json: @coins
  end

  # GET /coins/1
  def show
    render json: @coin
  end

  # POST /coins
  def create
    @coin = Coin.new(coin_params)

    if @coin.save
      render json: @coin, status: :created, location: @coin
    else
      render json: @coin.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /coins/1
  def update
    if @coin.update(coin_params)
      render json: @coin
    else
      render json: @coin.errors, status: :unprocessable_entity
    end
  end

  # DELETE /coins/1
  def destroy
    @coin.destroy
  end

  # GET /coins/mine
  def mine
    @coins = current_user.posts
    render json: @coins
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_coin
      @coin = Coin.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def coin_params
      params.require(:coin).permit(:volume_24h, :percent_change_1h, :percent_change_7d, :percent_change_24h, :market_cap, :current_price, :symbol, :name)
    end
end
