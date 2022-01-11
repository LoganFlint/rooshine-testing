<template>
  <div class="flex">
    <div
      class="flex flex-col"
      @drop.prevent="dropFile"
      @drag.prevent
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @dragenter="dragging = true"
    >
      <div
        :class="[
          'border border-dashed border-black bg-white',
          {
            'w-full py-4': uploadType == 'image' || uploadType == 'bottle',
            'max-w-sm': uploadType != 'image',
            'bg-pastelYellow': dragging,
            'p-2': uploadType == 'documents',
          },
        ]"
      >
        <input
          ref="input"
          type="file"
          hidden
          readonly="true"
          :accept="filterTypes"
          @change="fileSelected"
        >

        <!-- image preview -->
        <div
          v-if="modelValue && (uploadType === FileTypes.bottle || uploadType === FileTypes.image) && !state.uploading"
          class="flex align-middle items-center p-3 text-center"
          :class="{
            'w-full h-full': uploadType === FileTypes.bottle,
            'w-42 h-36': uploadType === FileTypes.image
          }"
        >
          <div
            class="w-full h-full relative justify-center"
            :class="{
              '-mt-6': uploadType === FileTypes.image
            }"
          >
            <div
              class="absolute rounded-full bg-unicornSilver top-2 right-2 cursor-pointer m-auto"
              title="remove image"
              @click="removeImage"
            >
              <img
                v-if="state.removing"
                class="h-5 w-5"
                src="../../assets/loading_black.svg"
                alt="remove image"
              >
              <img
                v-else
                class="h-5 w-5"
                src="../../assets/close_black.svg"
                alt="remove image"
              >
            </div>
            <img
              :class="{
                'w-[275px] h-[275px]': uploadType === FileTypes.bottle,
                'h-36 w-40': uploadType === FileTypes.image
              }"
              :src="imageUrl"
              :alt="uploadMessage"
            >
          </div>
        </div>

        <!-- additional image -->
        <div
          v-else-if="uploadType === FileTypes.image"
          :class="[
            'flex flex-col items-center max-w-xs w-full justify-between ',
            {
              'h-40 ': admin,
              'h-36 px-5': !admin,
            },
          ]"
          class
        >
          <img
            class="mt-7"
            src="../../assets/barrel_image_additional.svg"
            alt="img preview"
          >

          <div
            v-if="state.uploading"
            class="mx-6 pb-5 h-full w-24 flex flex-col justify-end"
          >
            <div class="flex items-center justify-center pb-2 opacity-50">
              Uploading
            </div>
            <ProgressBar
              class="w-full mt-2"
              :progress="state.progress"
            />
          </div>
          <MainButton
            v-else
            class="py-1 px-12"
            :label="buttonLabel"
            bg-color="outline"
            text-color="red"
            custom-px
            @click="chooseFile"
          />
        </div>

        <!-- Uploading a front/back image -->
        <div
          v-else-if="uploadType === FileTypes.bottle"
          class="h-[300px] w-[300px] flex flex-col w-full"
        >
          <!-- image selection -->
          <div
            class="mt-4 font-source font-semibold text-xs text-center uppercase pb-9"
          >
            {{ bottleDirection }}
          </div>
          <img
            class="w-11 h-11 mb-8 mx-auto"
            src="../../assets/bottle_image_upload.svg"
            alt="bottle img upload"
          >
          <div
            v-if="state.uploading"
            class="mx-6 pb-16 h-full flex flex-col justify-end"
          >
            <div class="flex items-center justify-center pb-2 opacity-50">
              Uploading
            </div>
            <ProgressBar
              class="w-full mt-2"
              :progress="state.progress"
            />
          </div>
          <template v-else>
            <div
              class="transition-all duration-300 ease-in-out text-center opacity-50 mb-8 overflow-hidden"
            >
              Drag and drop a photo
              <br>or
            </div>

            <MainButton
              class="py-1 mx-auto mb-6"
              :label="buttonLabel"
              bg-color="outline"
              text-color="red"
              @click="chooseFile"
            />
          </template>
        </div>
        <!-- Uploading document -->
        <div v-else-if="uploadType === FileTypes.documents">
          <div class="flex p-4 pl-[1.688rem] pt-[1.188rem] pr-[1.188rem] h-[5.188rem] w-[22.875rem]">
            <img
              class="h-11"
              src="../../assets/upload_file.svg"
              alt="file upload"
            >
            <div
              v-if="state.uploading"
              class="ml-4 pb-2 w-full h-full flex flex-col justify-end"
            >
              Uploading
              <ProgressBar
                class="w-full mt-2"
                :progress="state.progress"
              />
            </div>
            <template v-else>
              <div
                class="w-full m-3 mr-[1rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-s text-center"
              >
                {{ uploadMessage }}
              </div>
              <div
                v-if="modelValue"
                class="w-12 flex flex-col justify-center items-end pr-2 cursor-pointer"
                @click="removeImage"
              >
                <div class="bg-unicornSilver p-1 rounded-full">
                  <img
                    v-if="state.removing"
                    class="h-5 w-5"
                    src="../../assets/loading_black.svg"
                    alt="remove image"
                  >
                  <img
                    v-else
                    class="h-5 w-5"
                    src="../../assets/close_black.svg"
                    alt="remove image"
                  >
                </div>
              </div>
            </template>
            <MainButton
              v-if="!modelValue && !state.uploading"
              upload
              class="w-24 py-1 m-2 mx-0"
              :label="buttonLabel"
              bg-color="outline"
              text-color="red"
              @click="chooseFile"
            />
          </div>
          <div
            class="bg-speedOfLight p-3 font-source font-semibold text-xs text-center uppercase opacity-50"
          >
            {{ acceptedFiles }}
          </div>
        </div>
      </div>
    </div>
    <textarea
      v-if="uploadType === FileTypes.documents"
      v-model="state.documentNotes"
      class="focus:ring-0 focus:outline-none focus:border-black resize-none w-56 pt-2 pl-3.5"
      placeholder="Document Notes"
      :disabled="isBusy()"
      @focus="focusedAuthDocDesc"
      @blur="setAuthDocDesc"
    />
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import api from "../../api/api"
import { FileTypes } from "../../domain/FileTypes";

type MediaFile = File | null | { mediaId: string }

const props = defineProps({
	modelValue: { type: Object as PropType<MediaFile>, default: null },
	docDesc: { type: String as PropType<string | null>, default: null },
	barrelId: { type: String, default: "" },
	slotNum: { type: Number, default: null },
	uploadType: { type: String as PropType<FileTypes>, default: "" },
	bottleDirection: { type: String as PropType<"front side" | "back side">, default: "" },
	buttonLabel: { type: String, default: "upload" },
	admin: Boolean
});

const emit = defineEmits(["update:modelValue", "addFileAdditional", "updateDocDesc", "updateBusy"]);

const state = reactive({
	uploading: false,
	startUpload: false,
	previewImage: false,
	removing: false,
	updatingDesc: false,
	returnedMediaId: "",
	progress: 0.5,
	documentNotes: "",
	documentNotesFocused: "",
})

const input = ref<HTMLInputElement | null>(null)
const dragging = ref(false)
const assetTypes = ["pdf"]
const imageTypes = ["jpeg", "jpg", "png"] // no "webp" because iOS can't seem to support it, since it's been out since 2010..., no "bmp" because it crashes the server
const otherTypes = assetTypes.concat(imageTypes)
const assetFileTypes = assetTypes.map(type => "application/" + type)
const imageFileTypes = imageTypes.map(type => "image/" + type)
const otherFileTypes = assetFileTypes.concat(imageFileTypes)

if (props.modelValue !== null) {
	// file was provided upon creation, therefore it needs to be uploaded
	if (!(props.modelValue as { mediaId: string }).mediaId) {
		uploadFile(props.modelValue as File).catch(() => { /* do nothing */ })
	}
}

state.documentNotes = props.docDesc ?? ""

watch(
	() => props.docDesc,
	() => (state.documentNotes = props.docDesc ?? "")
)

const uploadMessage = computed(() => {
	if (props.modelValue && (props.modelValue as { mediaId: string }).mediaId) {
		if (props.uploadType === FileTypes.documents) return "Uploaded file"
		else return "Uploaded image" // image alt attribute
	} else {
		if (props.modelValue) return (props.modelValue as File).name
		else return "Drag and drop a file or"
	}
})

const imageUrl = computed(() => {
	if (props.modelValue && (props.modelValue as { mediaId: string }).mediaId) {
		return `/api/v1/barrel/${props.barrelId}/media/${(props.modelValue as { mediaId: string }).mediaId}` // we were given a URL
	} else {
		return props.modelValue ? URL.createObjectURL(props.modelValue as File) : ""
	}
});

const acceptedFiles = computed(() => {
	switch (props.uploadType) {
		case FileTypes.asset:
			return "ACCEPTED FILES: " + assetTypes.join(" / ")
		case FileTypes.image:
		case FileTypes.bottle:
			return "ACCEPTED FILES: " + imageTypes.filter(ext => ext !== "jpg").join(" / ")
		default:
			//FileTypes.Documents: //documents
			return "ACCEPTED FILES: " + otherTypes.filter(ext => ext !== "jpg").join(" / ")
	}
})

const filterTypes = computed(() => {
	switch (props.uploadType) {
		case FileTypes.asset:
			return assetFileTypes.join(", ")
		case FileTypes.image:
		case FileTypes.bottle:
			return imageFileTypes.join(", ")
		default:
			//FileTypes.Documents //documents
			return otherFileTypes.join(", ")
	}
})

const mediaId = computed(() => {
	if (props.modelValue && (props.modelValue as { mediaId: string }).mediaId) return (props.modelValue as { mediaId: string }).mediaId
	else return state.returnedMediaId
})

function chooseFile() {
	input.value?.click()
}

function fileSelected(event: Event) {
	const droppedFiles = (event.target as HTMLInputElement).files
	if (droppedFiles) {
		receiveFiles(Array.from(droppedFiles))
	}
}

function dropFile(event: DragEvent) {
	dragging.value = false
	const droppedFiles = event.dataTransfer?.files
	if (droppedFiles) {
		receiveFiles(Array.from(droppedFiles))
	}
}

function receiveFiles(droppedFiles: File[]) {
	const filteredFiles = droppedFiles.filter(pFile => {
		switch (props.uploadType) {
			case FileTypes.asset:
				return assetFileTypes.includes(pFile.type)
			case FileTypes.bottle:
			case FileTypes.image:
				return imageFileTypes.includes(pFile.type)
			case FileTypes.documents: //documents
				return otherFileTypes.includes(pFile.type)
		}
	})

	const file: File = filteredFiles[0]
	if (file && file !== null && file !== undefined) {
		uploadFile(file).catch(() => { /* do nothing */ })
		emit("update:modelValue", file)
		const filesAr = filteredFiles.slice(1)
		if (filesAr.length > 0) emit("addFileAdditional", filesAr)
	}
}

function uploadFile(file: File) {
	state.progress = 0
	state.uploading = true
	emit("updateBusy", true)
	// any is defined by the definition of how the catch works
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleError = (reason: any) => {
		if (input.value) input.value.value = ""
		emit("update:modelValue", null)
		state.returnedMediaId = ""
		console.error("error:", reason.response.data)
	}
	if ([FileTypes.image, FileTypes.bottle].includes(props.uploadType)) {
		const slotNum = getSlotNum()
		//upload images
		return api
			.uploadMedia(file, props.barrelId, slotNum, progressEvent => {
				state.progress = progressEvent.loaded / progressEvent.total // update the progressBar
			})
			.then(returnedMediaId => {
				state.returnedMediaId = returnedMediaId
			})
			.catch(handleError)
			.finally(() => {
				state.uploading = false
				emit("updateBusy", isBusy())
			})
	} else {
		// upload authentication documents
		return api
			.uploadAuthDocs(file, props.barrelId, progressEvent => {
				state.progress = progressEvent.loaded / progressEvent.total // update the progressBar
			})
			.then(returnedMediaId => {
				state.returnedMediaId = returnedMediaId
			})
			.catch(handleError)
			.finally(() => {
				state.uploading = false
				emit("updateBusy", isBusy())
			})
	}
}

function getSlotNum() {
	if (props.uploadType === FileTypes.bottle)
		return (props.bottleDirection === "front side" ? 0 : 1)
	else
		return props.slotNum
}

function setAuthDocDesc() {
	if (state.documentNotesFocused !== state.documentNotes?.trim()) {
		state.updatingDesc = true
		emit("updateBusy", true)
		api
			.setAuthDocDesc(props.barrelId, mediaId.value, state.documentNotes)
			.then(() => {
				emit("updateDocDesc", state.documentNotes)
			})
			.catch(reason => {
				console.log("reason.response.data", reason?.response?.data)
				console.warn("setAuthDocDesc failed!", reason)
			})
			.finally(() => {
				state.updatingDesc = false
				emit("updateBusy", isBusy())
			})
	}
}

function isBusy() {
	return state.updatingDesc || state.removing || state.uploading
}

function focusedAuthDocDesc() {
	state.documentNotesFocused = state.documentNotes
}

function removeImage() {
	if (!state.removing) {
		state.removing = true
		emit("updateBusy", true)
		// any is defined by the definition of how the catch works
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleResponse = (reason: any) => {
			state.removing = false
			if (reason?.response?.status === 404) {
				emit("update:modelValue", null) // file already deleted, so it doesn't exist
			} else {
				console.log(reason?.response?.data)
				console.error("reason", reason)
			}
		}
		const handleFinally = () => {
			state.removing = false
			state.returnedMediaId = ""
			if (input.value) input.value.value = ""
			emit("updateBusy", isBusy())
		}
		if ([FileTypes.image, FileTypes.bottle].includes(props.uploadType)) {
			//upload images
			api
				.deleteMedia(props.barrelId, mediaId.value)
				.then(() => {
					emit("update:modelValue", null)
				})
				.catch(handleResponse)
				.finally(handleFinally)
		} else {
			// upload authentication documents
			api
				.deleteAuthDocs(props.barrelId, mediaId.value)
				.then(() => {
					emit("update:modelValue", null)
				})
				.catch(handleResponse)
				.finally(handleFinally)
		}
	}
}

</script>
