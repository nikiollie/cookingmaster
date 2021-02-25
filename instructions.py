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

def getInstructions(url):
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get(url)

    #instructions!
    instructions = ""
    instr_list = driver.find_elements_by_class_name("instructions-section-item")
    stepnum = 1
    for instr in instr_list:
        instructions += "Step " + str(stepnum) + "\n"
        paragraph = instr.find_element_by_xpath(".//div[@class='section-body']/div[@class='paragraph']/p").text
        instructions += paragraph + "\n"
        stepnum +=1

    orig_serving = driver.find_element_by_class_name("recipe-adjust-servings__size-quantity").text

    driver.close()

    return instructions, orig_serving




#start process
if __name__ == '__main__':

    url = str(sys.argv[1])
    # optional = str(sys.argv[2])

    instructions, orig_serving = getInstructions(url)
    print(instructions)
    print("\n\n")
    print(orig_serving)

