from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pickle
import sys, time, os

# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()

# os.environ["GOOGLE_CHROME_BIN"] = "/usr/bin/google-chrome"
# os.environ["CHROMEDRIVER_PATH"] = "/usr/local/bin/chromedriver"

chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--no-sandbox")
# driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

def findRecipeName(url):
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get(url)

    recipeName = driver.find_element_by_css_selector("h1.headline.heading-content").text

    driver.close()

    return recipeName




#start process
if __name__ == '__main__':

    url = str(sys.argv[1])

    recipeName = findRecipeName(url)

    print(recipeName)

