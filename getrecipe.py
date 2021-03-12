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

def findRecipe(dish, optional):
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    link = "https://www.allrecipes.com/recipe/7565/too-much-chocolate-cake/"
    driver.get(link)


    # driver.find_element_by_id("fixedGridSection").find_element_by_xpath(".//article[@class='fixed-recipe-card']").click()

    url = driver.current_url

    driver.close()

    return url




#start process
if __name__ == '__main__':

    dish = str(sys.argv[1])
    optional = str(sys.argv[2])

    url = findRecipe(dish, optional)

    print(url)


