import datetime
import os
import matplotlib.pyplot as plt
from django.shortcuts import render
from .models import Currency
import requests
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use the Agg backend (for non-GUI environments)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL_API_EXCHANGE = 'https://api.exchangerate.host/timeseries'


def base(request):
    currencies = Currency.objects.all()
    context = {'currencies': currencies}
    return render(request, 'base.html', context)


def get_currency_history(from_currency, to_currency, amount, start_date, end_date):
    payload = {
        'base': from_currency,
        'symbols': to_currency,
        'amount': amount,
        'start_date': start_date,
        'end_date': end_date
    }
    try:
        response = requests.get(URL_API_EXCHANGE, params=payload)
        data = response.json()
        currency_history = {}
        for date, rates in data['rates'].items():
            if to_currency in rates:
                currency_history[date] = rates[to_currency]
            else:
                # Handle the case where the rate is missing
                currency_history[date] = None
        return currency_history
    except Exception as e:
        print(f'Error fetching data: {e}')
        return {}


def currency_converter_view(request, from_currency, amount, percent, to_currency, period):
    context = {}
    # Data collecting
    amount = float(amount)
    percent = float(percent)
    amount *= 1 + percent/100
    end_date = datetime.date.today()

    if period == '1m':
        start_date = end_date - datetime.timedelta(days=30)
    elif period == '1y':
        start_date = end_date - datetime.timedelta(days=365)
    elif period == '3y':
        start_date = end_date - datetime.timedelta(days=365*3)
    elif period == '5y':
        start_date = end_date - datetime.timedelta(days=365*5)
    else:
        # default 1 month
        start_date = end_date - datetime.timedelta(days=30)

    # Get data for each year in the selected period
    currency_history = {}
    while start_date <= end_date:
        year_end_date = start_date + datetime.timedelta(days=365)
        if year_end_date > end_date:
            year_end_date = end_date
        year_currency_history = get_currency_history(
            from_currency, to_currency, amount, start_date, year_end_date)
        currency_history.update(year_currency_history)
        start_date = year_end_date + datetime.timedelta(days=1)

    pd_currency_history = pd.DataFrame(
        {'Date': list(currency_history.keys()), 'Value': list(currency_history.values())})
    pd_currency_history.set_index('Date', inplace=True)
    pd_currency_history.columns = ['Rate']
    # Plotting
    # plt.figure(figsize=(10, 6))
    plt.plot(pd_currency_history.index, pd_currency_history['Rate'])
    # plt.ylabel(f'{amount} {from_currency} to {to_currency}')
    # plt.xlabel('Date')
    # plt.title('Currency Exchange Rate Over Time')
    # plt.xticks(rotation=45)
    # plt.tight_layout()

    # Save the plot as an image
    plot_image_name = 'currency_plot.png'  # Name of the image file
    plot_image_path = os.path.join(
        BASE_DIR, 'currency_converter_app', 'static', plot_image_name)

    plt.savefig(plot_image_path)

    plot_image_path = 'currency_plot.png'
    plt.savefig(plot_image_path)

    # Close the plot to release resources
    plt.close()

    # Pass the image path to the template
    context['plot_image_path'] = plot_image_path

    currencies = Currency.objects.all()
    context['currencies'] = currencies

    # currencies = Currency.objects.all()
    # context = {'currencies': currencies}
    return render(request, 'currency_converter.html', context)
