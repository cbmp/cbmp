import csv
import os

def readDownloadLinks():
    with open("C:\\Users\\chant\\Documents\\GitHub\\cbmp\\src\\data\\software.csv", encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        # making a dict, formatL {name: {type: "", url: ""}}
        package_dict = {}
        for row in csv_reader:
            # header
            if line_count == 0: 
                line_count += 1

            # body
            url_type = ""
            if "bioc" in row["download_link"]:
                url_type = "bioc"
            elif "cran" in row["download_link"]:
                url_type = "cran"
            elif "pypi" in row["download_link"]:
                url_type = "pypi"
            elif "anac" in row["download_link"]:
                url_type = "anac"
            else:
                url_type = "other"

            package_dict[row["name"]] = {
                                            "type": url_type,
                                            "url": row["download_link"]
                                        }
        return package_dict
                

if __name__ == "__main__":
    package_dict = readDownloadLinks();
