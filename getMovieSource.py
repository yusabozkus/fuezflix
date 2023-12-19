from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException

import time
import os

import firebase_admin
from firebase_admin import credentials, db

os.system("cls")

# Initialize Firebase app outside the loop
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://fuez-movie-default-rtdb.europe-west1.firebasedatabase.app/'
})

for i in range(189, 687):
    url = f'https://hdfilmcehennemi.cx/turkce-altyazili-filmler-izle/page/{i + 1}/'

    driver = webdriver.Chrome()
    driver.get(url)

    os.system("cls")
    print(f"url => {url}")

    # Realtime Database referansını alın
    db_ref = db.reference('/movies')

    while True:
        a_elements = driver.find_elements(By.CSS_SELECTOR, '#listehizala > div')
        counter = 1
        for element in a_elements:
            element.click()

            try:
                iframe = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, '#content > div.leftC > div:nth-child(1) > div.inepisode > div.filmalani > div > div > p > iframe'))
                )

                name = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, '#content > div.leftC > div:nth-child(1) > div.title > h1'))
                )

                iframe_src = iframe.get_attribute('src')

                new_movie_data = {
                    'movieSrc': iframe_src,
                    'movieName': name.text,
                    'likeCounter': 0,
                    'dislikeCounter': 0
                }

                new_movie_ref = db_ref.push(new_movie_data)

                print("Veri başarıyla eklendi.")

            except TimeoutException:
                print("Element bulunamadı. Zaman aşımı hatası.")
            except Exception as e:
                print(f"Bilinmeyen bir hata oluştu: {e}")

            driver.back()
            counter = counter + 1
            print(f"counter => {counter}")

            if counter == 21:
                break
        break

    driver.quit()
    
    
input("Kapatmak için Enter'a basın.")
