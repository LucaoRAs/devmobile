from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

url = "https://bgp.he.net/AS13335#_prefixes"

# Configurações do Chrome
options = Options()
options.add_argument("--headless")  # roda sem abrir janela
options.add_argument("--disable-gpu")

# Abre o navegador e carrega a página
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get(url)

# Pega o HTML já renderizado
html = driver.page_source
driver.quit()

# Faz o parse com BeautifulSoup
soup = BeautifulSoup(html, "html.parser")
tbl = soup.find("table", {"class": "table table-striped table-bordered table-condensed"})

if tbl:
    rows = tbl.find_all("tr")
    for row in rows[1:]:  # pula cabeçalho
        cols = row.find_all("td")
        if len(cols) >= 2:
            prefix = cols[0].get_text(strip=True)
            name = cols[1].get_text(strip=True)
            print(prefix, "-", name)
else:
    print("Tabela não encontrada!")
