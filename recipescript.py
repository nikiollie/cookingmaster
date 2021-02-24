from selenium import webdriver
from selenium.webdriver.common.keys import Keys
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

    dish = dish.replace(" ", "%20")
    if optional != "none":
        optional = optional.split(",")
        optionalStr = ""
        for index, i in enumerate(optional):
            i = i.replace(" ", "%20")
            optionalStr += i
            if len(optional) > 1 and index < len(optional)-1:
                optionalStr += ","
        link = "https://www.allrecipes.com/search/results/?wt=" + dish + "&ingIncl=" + optionalStr + "&sort=re"
        driver.get(link)
    else:
        link = "https://www.allrecipes.com/search/results/?sort=re&wt=" + dish
        driver.get(link)

    # assert "No results found." not in driver.page_source
    # firstResult = driver.find_element_by_xpath("/html/body/div[1]/div[2]/div/div[3]/section/article[2]")
    firstResult = driver.find_element_by_xpath("//article[@class='fixed-recipe-card']")
    firstResult.click()

    ingredients = ""
    all_spans = driver.find_elements_by_class_name("ingredients-item-name")
    for span in all_spans:
        ingredients += span.text 
        ingredients += "\n"

    orig_serving = driver.find_element_by_xpath("//*[@id='ar-calvera-app']/section[1]/div[1]/div[1]").get_attribute('data-init-servings-size')
    # ing_list = driver.find_element_by_xpath("//*[@id='ar-calvera-app']/section[1]/fieldset/ul")
    # ing = ing_list.find_elements_by_tag_name("li")
    # for item in ing:
    #     ingredients += item.span.span.text
    # ingredients = ing.text()
    driver.close()


    # ingredients="tomato"
    instructions="make"
    return ingredients, instructions, orig_serving

def getCorrectServing(ingredients, orig_serving, serving):
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get("https://mykitchencalculator.com/recipeconverter.html")
    # clear = driver.find_element_by_xpath("//*[@id='clearListButton']")
    # clear.click()
    recipeIn = driver.find_element_by_xpath("//*[@id='recipein']")
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

    time.sleep(2)
    new_ing = driver.find_element_by_id("recipeout").get_attribute('value')

    driver.close()
    return new_ing



#start process
if __name__ == '__main__':

    dish = str(sys.argv[1])
    serving = str(sys.argv[2])
    optional = str(sys.argv[3])

    ingredients, instructions, orig_serving = findRecipe(dish, optional)

    #ingredients
    newIngredients = getCorrectServing(ingredients, orig_serving, serving)
    print(newIngredients)
    print("\n\n")
    #instructions
    print(instructions)

