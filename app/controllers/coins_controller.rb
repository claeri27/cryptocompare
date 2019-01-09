class CoinsController < ApplicationController
  before_action :set_coin, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :update, :destroy, :mine]

  # GET /coins
  def index
    @coins = Coin.all

    render json: @coins
  end

  def rank
    @coins = Coin.all.order(:cmc_rank)
    render json: @coins
  end

  def rank_down
    @coins = Coin.all.order(cmc_rank: :desc)
    render json: @coins
  end

  def name
    @coins = Coin.all.order(:name)
    render json: @coins
  end

  def name_down
    @coins = Coin.all.order(name: :desc)
    render json: @coins
  end

  def symbol
    @coins = Coin.all.order(:symbol)
    render json: @coins
  end

  def symbol_down
    @coins = Coin.all.order(symbol: :desc)
    render json: @coins
  end

  def volume
    @coins = Coin.all.order(:volume_24h)
    render json: @coins
  end
  def volume_down
    @coins = Coin.all.order(volume_24h: :desc)
    render json: @coins
  end
  def market_cap
    @coins = Coin.all.order(:market_cap)
    render json: @coins
  end

  def market_cap_down
    @coins = Coin.all.order(market_cap: :desc)
    render json: @coins
  end

  def percent_change_1h
    @coins = Coin.all.order(:percent_change_1h)
    render json: @coins
  end

  def percent_change_1h_down
    @coins = Coin.all.order(percent_change_1h: :desc)
    render json: @coins
  end

  def percent_change_24h
    @coins = Coin.all.order(:percent_change_24h)
    render json: @coins
  end

  def percent_change_24h_down
    @coins = Coin.all.order(percent_change_24h: :desc)
    render json: @coins
  end

  def percent_change_7d
    @coins = Coin.all.order(:percent_change_7d)
    render json: @coins
  end

  def percent_change_7d_down
    @coins = Coin.all.order(percent_change_7d: :desc)
    render json: @coins
  end

  def current_price
    @coins = Coin.all.order(:current_price)
    render json: @coins
  end

  def current_price_down
    @coins = Coin.all.order(current_price: :desc)
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
      params.require(:coin).permit(:cmc_rank, :volume_24h, :percent_change_1h, :percent_change_7d, :percent_change_24h, :market_cap, :current_price, :symbol, :name)
    end
end
