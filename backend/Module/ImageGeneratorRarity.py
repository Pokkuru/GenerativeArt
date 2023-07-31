from PIL import Image
import os
import random
import csv
from .ExcelEdit import ExcelEdit


class Generator:
    def __init__(self):
        self.output_img_count = 0
        self.img_objs = {}
        self.cnt = 0
        self.combination_list = []
        self.temp_combination = ''
        self.temp_csv_line = []
        self.sampleOverLapImageGenerated = False
        self.sampleOverLapImage = Image.open("./template/sample_image_01.png")
        self.excel_operator = ExcelEdit()
        self.duplicate_counter = 0
        self.avoid_duplicate_mode_enable = False
        self.max_items = 0

    def SetSampleOverLapImage(self, img):
        self.sampleOverLapImage = img

    def GetSampleOverLapImage(self):
        return(self.sampleOverLapImage)

    def MakeOverLapSampleImage(self, img_shape):
        partsImage = Image.open("./template/sample_image_01.png")
        resultImage = Image.new("RGBA", img_shape, (255, 255, 255, 0))
        currentX = 0
        currentY = 0
        if(img_shape[0] < 850 or img_shape[1] < 850):
            if(img_shape[0] < img_shape[1]):
                partsImage = partsImage.resize((img_shape[0], img_shape[0]))
            else:
                partsImage = partsImage.resize((img_shape[1], img_shape[1]))
        while currentY < img_shape[1]:
            while currentX < img_shape[0]:
                resultImage.paste(partsImage, (currentX, currentY))
                currentX += 850
            currentY += 850
        return resultImage

    def OverlapSampleImage(self, baseImage):
        if self.sampleOverLapImageGenerated is False:
            self.SetSampleOverLapImage(
                self.MakeOverLapSampleImage(
                    baseImage.size))
            self.sampleOverLapImageGenerated = True
        resultImage = Image.alpha_composite(
            baseImage, self.GetSampleOverLapImage())
        return(resultImage)

    def IndexDetector(self, number, rates, numbers, generated_numbers):
        rate_list = rates
        rate_mod_list = [0.0]
        for idx in range(len(rate_list)):
            rate_mod_list.append(rate_mod_list[idx] + float(rate_list[idx]))
        result = -1
        for idx in range(len(rate_mod_list) - 1):
            if(rate_mod_list[idx] < number and number < rate_mod_list[idx + 1]):
                return(idx)
            else:
                continue
        return(result)

    def ImageSelector(self, layer_num, base_layer):
        imgs = self.img_objs[f"layer{str(layer_num+1)}"]
        rates = []
        numbers = []
        generated_numbers = []
        item_idx_list = []
        rand_max = 0
        count_number_0 = 0
        all_item_covered = False

        # 全種カバーできていない場合個数がゼロのものを計数
        if(self.max_items / 2 < self.output_img_count):
            for item_idx, item_key in enumerate(
                    self.img_objs[f"layer{str(layer_num+1)}"].keys()):
                if(self.img_objs[f"layer{str(layer_num+1)}"][item_key]['generated_number'] == 0):
                    count_number_0 += 1

        if count_number_0 == 0:
            all_item_covered = True

        if all_item_covered:
            for item_idx, item_key in enumerate(
                    self.img_objs[f"layer{str(layer_num+1)}"].keys()):
                item_idx_list.append(item_idx)
                rates.append(
                    self.img_objs[f"layer{str(layer_num+1)}"][item_key]['rate'])
                rand_max += float(
                    self.img_objs[f"layer{str(layer_num+1)}"][item_key]['rate'])
                numbers.append(
                    self.img_objs[f"layer{str(layer_num+1)}"][item_key]['number'])
                generated_numbers.append(
                    self.img_objs[f"layer{str(layer_num+1)}"][item_key]['generated_number'])
        else:
            for item_idx, item_key in enumerate(
                    self.img_objs[f"layer{str(layer_num+1)}"].keys()):
                if self.img_objs[f"layer{str(layer_num+1)}"][item_key]['generated_number'] == 0:
                    item_idx_list.append(item_idx)
                    rates.append(
                        self.img_objs[f"layer{str(layer_num+1)}"][item_key]['rate'])
                    rand_max += float(
                        self.img_objs[f"layer{str(layer_num+1)}"][item_key]['rate'])
                    numbers.append(
                        self.img_objs[f"layer{str(layer_num+1)}"][item_key]['number'])
                    generated_numbers.append(
                        self.img_objs[f"layer{str(layer_num+1)}"][item_key]['generated_number'])

        selected_img = Image.new("RGBA", base_layer.size, (255, 255, 255, 0))
        selected_idx = -1
        while selected_idx == -1:
            ran = random.uniform(0, rand_max)
            selected_idx = self.IndexDetector(
                ran, rates, numbers, generated_numbers)
        item_num = item_idx_list[selected_idx] + 1
        selected_img = imgs[f"item{item_num}"]['image']
        return item_num, selected_img

    def AddLayer(
            self,
            base_layer,
            layer_num,
            folder_name,
            max_arts):
        img_layerA = base_layer
        itemIdx, img_layerB = self.ImageSelector(
            layer_num,
            base_layer)
        img_layerA = Image.alpha_composite(img_layerA, img_layerB)
        self.temp_combination += f"layer{layer_num+1}-item{itemIdx}"
        img_name = f"{str(self.output_img_count).zfill(8)}.png"
        if len(self.temp_csv_line) == 0:
            self.temp_csv_line.append(
                img_name)
        csv_line_text = self.img_objs[f'layer{layer_num+1}'][f"item{itemIdx}"]['raw_filename'].split('/')[
            1]
        self.temp_csv_line.append(csv_line_text)

        if(len(self.img_objs) > layer_num + 1):
            self.AddLayer(
                img_layerA,
                layer_num + 1,
                folder_name,
                max_arts)
        else:
            if self.temp_combination in self.combination_list:
                self.temp_csv_line.clear()
                return()
            else:
                # 重複なしの場合generated_numberを1増やして、画像とログを書き出して戻す
                self.combination_list.append(self.temp_combination)
                os.makedirs(folder_name, exist_ok=True)
                with open(f'./{folder_name}/items.csv', 'a') as file:
                    writer = csv.writer(file, lineterminator='\n')
                    writer.writerow(self.temp_csv_line)
                self.temp_csv_line.pop(0)
                for l_num, elem in enumerate(self.temp_csv_line):
                    for item_key in self.img_objs[f"layer{str(l_num+1)}"].keys():
                        if elem in self.img_objs[f"layer{str(l_num+1)}"][item_key]['raw_filename']:
                            temp_num = self.img_objs[f"layer{str(l_num+1)}"][item_key]['generated_number']
                            temp_num += 1
                            self.img_objs[f"layer{str(l_num+1)}"][item_key]['generated_number'] = temp_num
                self.temp_csv_line.clear()
                # サンプル透過画像を重ねる
                # img_layerA = self.OverlapSampleImage(img_layerA)
                img_layerA.save(
                    f"{folder_name}/{str(self.output_img_count).zfill(8)}.png")
                self.output_img_count += 1
                return()

    def ImageGeneratorRarity(self, img_objs_src, max_items, folder_name, dirs):
        self.cnt = 0
        self.combination_list.clear
        self.temp_combination = ''
        self.img_objs = img_objs_src
        self.output_img_count = 0
        self.excel_operator.SetWorkFolder(folder_name)
        self.max_items = max_items
        img_base = Image.new(
            "RGBA", self.img_objs['layer1']["item1"]['image'].size, (255, 255, 255, 0))
        while self.output_img_count < int(self.max_items):
            self.temp_combination = ''
            self.AddLayer(
                img_base,
                0,
                folder_name,
                max_items)
        self.excel_operator.CSV2Sheet()
        self.excel_operator.SetFoldersSheet(dirs)
        self.excel_operator.SaveExcel(folder_name)
        return()
