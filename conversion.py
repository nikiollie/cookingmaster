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

def getCorrectServing(ingredients, orig_serving, serving):
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get("https://mykitchencalculator.com/recipeconverter.html")

    # recipeIn = driver.find_element_by_xpath("//*[@id='recipein']")
    recipeIn = driver.find_element_by_id("recipein")
    recipeIn.clear()
    recipeIn.send_keys(ingredients)
    recipeIn.send_keys(Keys.TAB) #or .submit()

    # portion = driver.find_element_by_xpath("/html/body/main/section/div[2]/div[3]/div[1]/div[7]/div[2]/button")
    driver.find_element_by_id("portionTab").click()

    input_orig = driver.find_element_by_id("oyield")
    input_orig.clear()
    input_orig.send_keys(orig_serving)
    input_orig.send_keys(Keys.ENTER)

    input_new = driver.find_element_by_id("dyield")
    input_new.clear()
    input_new.send_keys(serving)
    input_new.send_keys(Keys.ENTER)

    driver.find_element_by_id("portionButton").click()

    new_ing = driver.find_element_by_id("recipeout").get_attribute('value')

    driver.close()
    return new_ing



#start process
if __name__ == '__main__':

    ingredients = str(sys.argv[1])
    orig_serving = str(sys.argv[2])
    serving = str(sys.argv[3])

    #ingredients
    newIngredients = getCorrectServing(ingredients, orig_serving, serving)
    print(newIngredients)


