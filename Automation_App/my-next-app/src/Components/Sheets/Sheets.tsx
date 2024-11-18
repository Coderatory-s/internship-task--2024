import React, { useState, useRef } from 'react'; // Import useState from React
import { useUserStore } from '../store/Zustand_Store';
import { IoMdTrash } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { Loader2 } from "lucide-react"
// import { GoogleLogin } from '@react-oauth/google';
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from '@/hooks/use-toast';
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter
} from "@/Components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
const api = require('../api/api');
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { Slack } from 'lucide-react';

interface SelectedPlatforms {
  [key: string]: boolean; // Any key of type string with boolean values
}

const Sheets: React.FC<{
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  isDetailsOpen: boolean;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDroppedItems: React.Dispatch<React.SetStateAction<any[]>>;
  droppedItems: any[];
}> = ({
  selectedItem,
  setSelectedItem,
  isDetailsOpen,
  setIsDetailsOpen,
  setDroppedItems,
  droppedItems,
}) => {

    const router = useRouter();
    const addform = useUserStore((state) => state.addForm)
    const gmail_array = useUserStore((state) => state.gmail_array)
    const addEmail = useUserStore((state) => state.addEmail)
    const remove_Email = useUserStore((state) => state.remove_Email)
    const resetGmailArray = useUserStore((state) => state.resetGmailArray)
    const [sign_in, set_sign_in] = useState(false);
    const [sheets_data, setsheets_data] = useState([]);
    const [shorts, setshorts] = useState<any>();
    const [show_short_modal, set_short_modal] = useState(false);
    const [preview, setpreview] = useState();
    const [show_loading, set_show_loading] = useState(false);
    const [src, setSrc] = useState<any>(null);
    const [crop, setCrop] = useState<Crop>();
    const imageRef = useRef<HTMLImageElement>(null);
    const [PDFpreview, setPDFpreview] = useState<any>(null);
    const [email, setemail] = useState("");
    const [documentType, setDocumentType] = useState('');
    const [fields, setFields] = useState<any[]>([]);


    const [selectedPlatforms, setSelectedPlatforms] = useState<SelectedPlatforms>({
      facebook: false,
      instagram: false,
      youtube: false,
      linkedin: false,
    });

    const [form_data, setform_data] = useState({
      type: "",
      email: "",
      message: "",
      subject: "",
      duration: "",
      url: "",
      to: "",
      title: "",
      start_date: "",
      spread_sheet_url: '',
      status: "",
      file: "",
      google_reminder: false,
      slack_reminder: false,
      google_drive: false,
      selected_platform: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      if (name && files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setform_data((prevFormData) => ({
            ...prevFormData,
            [name]: reader.result as string, // store the base64 string
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setform_data((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }

    const handleFiChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const files = e.target.files[0]
      if (files) {
        const reader = new FileReader();
        reader.onload = () => setSrc(reader.result);
        reader.readAsDataURL(files);
      }
    };

    const getCroppedImgBase64 = (image: any, crop: any) => {
      if (!image || !crop || !crop.width || !crop.height) {
        alert("Invalid image or crop parameters.");
        return "";
      }
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx: any = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return canvas.toDataURL("image/jpeg");
    };

    const handleCropComplete = (image: any, crop: any) => {
      if (crop.width && crop.height) {
        const base64 = getCroppedImgBase64(image, crop);
        setform_data((pre) => (
          {
            ...pre,
            file: base64,
          }
        ))
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const { files } = e.target;
      setshorts(files[0]);
      if (files) {
        const reader: any = new FileReader();
        reader.onloadend = () => {
          setpreview(reader.result)
        };
        reader.readAsDataURL(files[0]);
      }
    }

    // Handle checkbox state changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const { id, checked } = e.target;
      setSelectedPlatforms((prev) => ({ ...prev, [id]: checked }));
    };

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const { name, checked } = e.target;
      setform_data((prev) => ({ ...prev, [name]: checked }));
      console.log(name, checked);
    };

    const handleAddField = (type: string) => {
      setFields([...fields, { type, value: '' }]);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target;
      const updatedFields = [...fields];
      updatedFields[index].value = value;
      setFields(updatedFields);
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const handleSubmit = async () => {
      try {
        // Collect form data and send it to the backend
        set_show_loading(true);
        const dataToSend = fields.reduce((acc, field) => {
          if (!acc[field.type]) {
            acc[field.type] = []; // Initialize an array for each field type
          }
          acc[field.type].push(field.value); // Push each field's value into the respective type array
          return acc;
        }, {});

        const response = await api.post_pdf(dataToSend, documentType);
        if (response) {
          set_show_loading(false);
          set_short_modal(true);
          setPDFpreview(response);
        }
      }
      catch (e) {
        set_show_loading(false);
        console.log(e);
      }
    };

    const handleDownload = () => {
      if (PDFpreview) {
        const url = window.URL.createObjectURL(PDFpreview);  // Create object URL from Blob
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generated-document.pdf';
        link.click();
        set_short_modal(true);
      }
    };

    const getSelectedPlatforms = (): string[] => {
      return Object.keys(selectedPlatforms).filter((platform) => selectedPlatforms[platform]);
    };

    const saveDetails = () => {
      setSrc('');
      const platformsArray = getSelectedPlatforms(); // Get selected platforms array
      const updatedFormData = {
        ...form_data,
        type: selectedItem.type, // Get type from selectedItem
        to: gmail_array,
        selected_platform: platformsArray,
        google_reminder: form_data.google_reminder,
        slack_reminder: form_data.slack_reminder,
      };
      if (updatedFormData.type && updatedFormData.type.length > 0) {
        addform(updatedFormData);

        setform_data({
          type: '',
          email: '',
          subject: '',
          message: '',
          url: '',
          duration: '',
          to: '',
          title: '',
          start_date: '',
          spread_sheet_url: '',
          status: '',
          file: '',
          selected_platform: [],
          google_reminder: false,
          slack_reminder: false,
          google_drive: false
        });

        setSelectedPlatforms({
          facebook: false,
          instagram: false,
          youtube: false,
          linkedin: false
        });

        resetGmailArray(); // Reset gmail array after saving details

        toast({
          title: `Your Work_Flow is Recorded`,
          description: `${new Date().toLocaleString()}`,
        });
      }
      setIsDetailsOpen(false);
      setSelectedItem(null);
    }

    const handleLoginSuccess = async (credentialResponse: any) => {
      try {
        let a = await api.send_id_token(credentialResponse.code);
        if (a) {
          set_sign_in(true);
          toast({
            title: `Google Calendar Authrization Completeded`
          });
          let b = await api.get_sheets_data();
          setsheets_data(b);
        }
      }
      catch (error: any) {
        console.log(error);
        set_sign_in(false);
        toast({
          variant: "destructive",
          title: `You are not Authorized to login to Google `,
          description: `Please try again`
        });
      }
    };

    const handleLoginError = () => {
      console.log('Login Failed');
      toast({
        variant: "destructive",
        title: `You are not Authorized to login to Google `,
        description: `Please try again`
      });
      router.push('/login')
    };

    const googlelogin = useGoogleLogin({
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
      flow: 'auth-code',
      scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive'
    })

    const short_video = async () => {
      try {
        set_show_loading(true);
        if (!shorts) {
          alert('Please select a file to upload.');
          set_show_loading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', shorts);
        formData.append('upload_preset', 'automation');
        formData.append('cloud_name', 'de2nzvcrd'); // Replace with your Cloudinary cloud name
        const video = await api.fetch_short_video(formData);
        if (video) {
          const originalUrl = video.secure_url; // Full video URL
          const transformedUrl = originalUrl.replace('/upload/', '/upload/so_0,eo_10/');
          setshorts(transformedUrl);
          setpreview(transformedUrl);
          set_show_loading(false);
          set_short_modal(true);
          toast({
            title: `Short Video Generated`,
            description: `${new Date().toLocaleDateString()}`
          });
        }
      }
      catch (e) {
        set_short_modal(false);
        set_show_loading(false);
        toast({
          variant: "destructive",
          title: `Failed to Generate Short Video`,
          description: `Please try again`
        });
        console.log(e)
      }
    }

    return (

      <>
        {selectedItem && (
          <>
            <Sheet open={isDetailsOpen} >
              <SheetContent className='overflow-scroll'>
                <SheetHeader>
                  <SheetTitle>{selectedItem.name}</SheetTitle>
                  <SheetDescription>
                    Fill the form for {selectedItem.name}. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                {selectedItem.type === 'Gmail' && (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Email
                        </Label>
                        <Input id="username" type='text' name='email' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Subject
                        </Label>
                        <Input id="username" type='text' name='subject' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Messasage
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          To
                        </Label>
                        <Input id="username" type='text' name='to' value={gmail_array} readOnly onChange={handleInputChange} className="col-span-2" />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className='bg-green-700 hover:bg-green-600'>Add</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Add Mail</AlertDialogTitle>
                              <AlertDialogDescription className=''>
                                <div className="flex w-full  items-center space-x-2 my-1 ">
                                  <Input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                                  <Button className='bg-green-600 hover:bg-green-500' onClick={() => addEmail(email)} ><FaPlus /></Button>
                                </div>
                                <div className=''>
                                  <Table className=''>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[100px]">Sno</TableHead>
                                        <TableHead>Mail</TableHead>
                                        <TableHead className="text-right">Remove</TableHead>
                                      </TableRow>
                                    </TableHeader>

                                    <TableBody >
                                      {/* <div className='max-h-[300px]  overflow-y-scroll  border'> */}
                                      {gmail_array.map((item: any, index: any) => (
                                        <TableRow>
                                          <TableCell className="font-medium">{index + 1}</TableCell>
                                          <TableCell>{item}</TableCell>
                                          <TableCell className="text-right"><Button className='bg-red-600 hover:bg-red-500' onClick={() => remove_Email(item)} > <IoMdTrash /></Button></TableCell>
                                        </TableRow>
                                      ))}
                                      {/* </div> */}
                                    </TableBody>

                                  </Table>

                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel >Cancel</AlertDialogCancel>
                              <AlertDialogAction className='bg-green-600 hover:bg-green-500'>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                   
                       <div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                      <SheetDescription className='mt-2'>
                        Select the platforms on which you would like to Automate Reminder .
                      </SheetDescription>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="slack_reminder" name='slack_reminder' type="checkbox" checked={form_data.slack_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Slack Notification</label>
                        </div>
                        {/* slack notfication */}
                      </div>
                      {form_data.slack_reminder && (
                        <>
                          <div className=''>
                            <div className="grid grid-cols-4 items-center gap-4 mt-1">
                              <Label htmlFor="username" className="text-right">
                                URL
                              </Label>
                              <Input id="username" type='text' name='url' onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <span className='text-sm ml-20 text-gray-600'>Give slack weebhook url (workspace)</span>
                          </div>
                        </>
                      )}


                    </div>
                  </>
                )}
                {selectedItem.type === 'Slack_Notification' && (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Email
                        </Label>
                        <Input id="username" type='text' name='email' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Subject
                        </Label>
                        <Input id="username" type='text' name='subject' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Messasage
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            URL
                          </Label>
                          <Input id="username" type='text' name='url' onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <span className='text-sm ml-20 text-gray-600'>Give slack weebhook url (workspace)</span>
                      </div>
                      <div>
                        <div>
                          <SheetDescription className='my-4'>
                            (Optional) Set a specific date to trigger this action
                          </SheetDescription>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Duration
                            </Label>
                            <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                          </div>
                        </div>

                        <SheetDescription className='my-3'>
                          Select the platforms on which you would like to Automate Reminder .
                        </SheetDescription>
                        <div className="flex items-center space-x-2 my-2" >

                          <div className="flex items-center">
                            <input id="google_reminder" name='google_reminder' type="checkbox" checked={form_data.google_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gmail Notification</label>
                          </div>
                        </div>

                        {/* gmail table */}
                        {form_data.google_reminder && (
                          <>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                To
                              </Label>
                              <Input id="username" type='text' name='to' value={gmail_array} readOnly onChange={handleInputChange} className="col-span-2" />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button className='bg-green-700 hover:bg-green-600'>Add</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Add Mail</AlertDialogTitle>
                                    <AlertDialogDescription className=''>
                                      <div className="flex w-full  items-center space-x-2 my-1 ">
                                        <Input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                                        <Button className='bg-green-600 hover:bg-green-500' onClick={() => addEmail(email)} ><FaPlus /></Button>
                                      </div>
                                      <div className=''>
                                        <Table className=''>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead className="w-[100px]">Sno</TableHead>
                                              <TableHead>Mail</TableHead>
                                              <TableHead className="text-right">Remove</TableHead>
                                            </TableRow>
                                          </TableHeader>

                                          <TableBody >
                                            {/* <div className='max-h-[300px]  overflow-y-scroll  border'> */}
                                            {gmail_array.map((item: any, index: any) => (
                                              <TableRow>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>{item}</TableCell>
                                                <TableCell className="text-right"><Button className='bg-red-600 hover:bg-red-500' onClick={() => remove_Email(item)} ><IoMdTrash /></Button></TableCell>
                                              </TableRow>
                                            ))}
                                            {/* </div> */}
                                          </TableBody>

                                        </Table>

                                      </div>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-green-600 hover:bg-green-500'>Continue</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </>
                        )}

                      </div>
                    </div>
                  </>
                )}
                {selectedItem.type === 'Google_Calendar' && (
                  <>
                    {!sign_in ?
                      <>
                        <div className='my-3 mx-10'>
                          <Button onClick={googlelogin} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Authorize Google Account</Button>
                        </div>
                      </>
                      :
                      <>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Email
                            </Label>
                            <Input id="username" type='text' name='email' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Title
                            </Label>
                            <Input id="username" type='text' name='title' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Messaage
                            </Label>
                            <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Date
                            </Label>
                            <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div>
                            <SheetDescription className='my-3'>
                              Select the platforms on which you would like to Automate Reminder .
                            </SheetDescription>
                            <div className="flex items-center space-x-2 my-2" >

                              <div className="flex items-center">
                                <input id="google_reminder" name='google_reminder' type="checkbox" checked={form_data.google_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gmail Notification</label>
                              </div>
                            </div>

                            {/* gmail table */}
                            {form_data.google_reminder && (
                              <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="username" className="text-right">
                                    To
                                  </Label>
                                  <Input id="username" type='text' name='to' value={gmail_array} readOnly onChange={handleInputChange} className="col-span-2" />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className='bg-green-700 hover:bg-green-600'>Add</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Add Mail</AlertDialogTitle>
                                        <AlertDialogDescription className=''>
                                          <div className="flex w-full  items-center space-x-2 my-1 ">
                                            <Input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                                            <Button className='bg-green-600 hover:bg-green-500' onClick={() => addEmail(email)} ><FaPlus /></Button>
                                          </div>
                                          <div className=''>
                                            <Table className=''>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead className="w-[100px]">Sno</TableHead>
                                                  <TableHead>Mail</TableHead>
                                                  <TableHead className="text-right">Remove</TableHead>
                                                </TableRow>
                                              </TableHeader>

                                              <TableBody >
                                                {/* <div className='max-h-[300px]  overflow-y-scroll  border'> */}
                                                {gmail_array.map((item: any, index: any) => (
                                                  <TableRow>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{item}</TableCell>
                                                    <TableCell className="text-right"><Button className='bg-red-600 hover:bg-red-500' onClick={() => remove_Email(item)} ><IoMdTrash /></Button></TableCell>
                                                  </TableRow>
                                                ))}
                                                {/* </div> */}
                                              </TableBody>

                                            </Table>

                                          </div>
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='bg-green-600 hover:bg-green-500'>Continue</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </>
                            )}

                            <div className="flex items-center space-x-2 my-3">

                              <div className="flex items-center">
                                <input id="slack_reminder" name='slack_reminder' type="checkbox" checked={form_data.slack_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Slack Notification</label>
                              </div>

                              {/* slack notfication */}



                            </div>
                            {form_data.slack_reminder && (
                              <>
                                <div className='mt-4'>
                                  <div className="grid grid-cols-4 items-center gap-4 mt-2">
                                    <Label htmlFor="username" className="text-right">
                                      URL
                                    </Label>
                                    <Input id="username" type='text' name='url' onChange={handleInputChange} className="col-span-3" />
                                  </div>
                                  <span className='text-sm ml-20 text-gray-600'>Give slack weebhook url (workspace)</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    }

                  </>
                )}
                {selectedItem.type === 'Google_Sheets' && (
                  <>
                    {!sign_in ?
                      <>
                        <div className='my-3 mx-10'>
                          <Button onClick={googlelogin} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Authorize Google Account</Button>
                        </div>
                      </>
                      :
                      <>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Email
                            </Label>
                            <Input id="username" type='text' name='email' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div>
                            <SheetDescription>
                              <div className='mx-16 mb-4'>  Select your GoogleSheets Document</div>
                            </SheetDescription>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Sheets
                              </Label>
                              {/* <Input id="username" type='text' name='spread_sheet_url' onChange={handleInputChange} className="col-span-3" /> */}
                              <Select onValueChange={(id) => setform_data((pre) => {
                                return { ...pre, spread_sheet_url: id }
                              })}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Google Sheet" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {sheets_data && sheets_data.map((e: any) => {
                                      return (
                                        <>
                                          <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                                        </>
                                      )
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Subject
                            </Label>
                            <Input id="username" type='text' name='subject' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Messasage
                            </Label>
                            <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Status
                            </Label>
                            <Input id="username" type='text' name='status' onChange={handleInputChange} className="col-span-3" />
                          </div>


                          {/* googl reminder  */}
                          <div>
                            <SheetDescription className='my-3'>
                              Select the platforms on which you would like to Automate Reminder .
                            </SheetDescription>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Status
                              </Label>
                              <Input id="username" type='datetime-local' name='start_date' onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="flex items-center space-x-2 my-2" >



                              <div className="flex items-center">
                                <input id="google_reminder" name='google_reminder' type="checkbox" checked={form_data.google_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gmail Notification</label>
                              </div>
                            </div>


                            {/* gmail table */}
                            {form_data.google_reminder && (
                              <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="username" className="text-right">
                                    To
                                  </Label>
                                  <Input id="username" type='text' name='to' value={gmail_array} readOnly onChange={handleInputChange} className="col-span-2" />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className='bg-green-700 hover:bg-green-600'>Add</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Add Mail</AlertDialogTitle>
                                        <AlertDialogDescription className=''>
                                          <div className="flex w-full  items-center space-x-2 my-1 ">
                                            <Input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                                            <Button className='bg-green-600 hover:bg-green-500' onClick={() => addEmail(email)} ><FaPlus /></Button>
                                          </div>
                                          <div className=''>
                                            <Table className=''>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead className="w-[100px]">Sno</TableHead>
                                                  <TableHead>Mail</TableHead>
                                                  <TableHead className="text-right">Remove</TableHead>
                                                </TableRow>
                                              </TableHeader>

                                              <TableBody >
                                                {/* <div className='max-h-[300px]  overflow-y-scroll  border'> */}
                                                {gmail_array.map((item: any, index: any) => (
                                                  <TableRow>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{item}</TableCell>
                                                    <TableCell className="text-right"><Button className='bg-red-600 hover:bg-red-500' onClick={() => remove_Email(item)} ><IoMdTrash /></Button></TableCell>
                                                  </TableRow>
                                                ))}
                                                {/* </div> */}
                                              </TableBody>

                                            </Table>

                                          </div>
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel  >Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='bg-green-600 hover:bg-green-500'>Continue</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </>
                            )}

                            <div className="flex items-center space-x-2 my-3">

                              <div className="flex items-center">
                                <input id="slack_reminder" name='slack_reminder' type="checkbox" checked={form_data.slack_reminder} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Slack Notification</label>
                              </div>

                              {/* slack notfication */}



                            </div>
                            {form_data.slack_reminder && (
                              <>
                                <div className='mt-4'>
                                  <div className="grid grid-cols-4 items-center gap-4 mt-2">
                                    <Label htmlFor="username" className="text-right">
                                      URL
                                    </Label>
                                    <Input id="username" type='text' name='url' onChange={handleInputChange} className="col-span-3" />
                                  </div>
                                  <span className='text-sm ml-24 text-gray-600'>Give slack webhook url (workspace) </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    }

                  </>
                )}
                {selectedItem.type === 'Linked_in' && (

                  <>
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Description
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="picture">File</Label>
                        <Input id="picture" type="file" name='file' accept="image/*" onChange={handleFiChange} className="col-span-3" />
                      </div>

                      {src && (

                        <ReactCrop
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={(croppedImage) => {
                            if (imageRef.current) {
                              handleCropComplete(imageRef.current, croppedImage);
                            }
                          }}
                        >
                          <img src={src} ref={imageRef} alt="Cropped Image" style={{ width: "100%", height: '200px' }} />
                        </ReactCrop>
                      )}

<div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                      <div>
                        <SheetDescription className='my-3'>
                          "Select the platforms on which you would like to post.
                        </SheetDescription>
                        <div className="flex items-center space-x-2">

                          <div className="flex items-center">
                            <input id="instagram" type="checkbox" checked={selectedPlatforms.instagram} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Instagram</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="facebook" type="checkbox" value="" checked={selectedPlatforms.facebook} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Facebook</label>
                        </div>


                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="youtube" type="checkbox" checked={selectedPlatforms.youtube} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Youtube</label>
                        </div>


                      </div>



                    </div>

                  </>
                )}
                {selectedItem.type === 'Youtube' && (

                  <>
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Description
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="picture">File</Label>
                        <Input id="picture" type="file" name='file'  onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                      <div>
                        <SheetDescription className='my-3'>
                          "Select the platforms on which you would like to post.
                        </SheetDescription>
                        <div className="flex items-center space-x-2">

                          <div className="flex items-center">
                            <input id="instagram" type="checkbox" checked={selectedPlatforms.instagram} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Instagram</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="facebook" type="checkbox" value="" checked={selectedPlatforms.facebook} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Facebook</label>
                        </div>


                      </div>

                    </div>

                  </>
                )}
                {selectedItem.type === 'Facebook' && (

                  <>
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Description
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="picture">File</Label>
                        <Input id="picture" type="file" name='file' accept="image/*" onChange={handleFiChange} className="col-span-3" />
                      </div>

                      {src && (

                        <ReactCrop
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={(croppedImage) => {
                            if (imageRef.current) {
                              handleCropComplete(imageRef.current, croppedImage);
                            }
                          }}
                        >
                          <img src={src} ref={imageRef} alt="Cropped Image" style={{ width: "100%", height: '200px' }} />
                        </ReactCrop>
                      )}

<div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                      <div>
                        <SheetDescription className='my-3'>
                          "Select the platforms on which you would like to post.
                        </SheetDescription>
                        <div className="flex items-center space-x-2">

                          <div className="flex items-center">
                            <input id="instagram" type="checkbox" checked={selectedPlatforms.instagram} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Instagram</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="youtube" type="checkbox" value="" checked={selectedPlatforms.youtube} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Youtube</label>
                        </div>


                      </div>

                    </div>

                  </>
                )}
                {selectedItem.type === 'Instagram' && (

                  <>
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Description
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="picture">File</Label>
                        <Input id="picture" type="file" name='file' accept="image/*" onChange={handleFiChange} className="col-span-3" />
                      </div>

                      {src && (

                        <ReactCrop
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={(croppedImage) => {
                            if (imageRef.current) {
                              handleCropComplete(imageRef.current, croppedImage);
                            }
                          }}
                        >
                          <img src={src} ref={imageRef} alt="Cropped Image" style={{ width: "100%", height: '200px' }} />
                        </ReactCrop>
                      )}

<div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                      <div>
                        <SheetDescription className='my-3'>
                          Select the platforms on which you would like to post.
                        </SheetDescription>
                        <div className="flex items-center space-x-2">

                          <div className="flex items-center">
                            <input id="facebook" type="checkbox" checked={selectedPlatforms.facebook} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Facebook</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="youtube" type="checkbox" value="" checked={selectedPlatforms.youtube} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Youtube</label>
                        </div>


                      </div>

                    </div>

                  </>
                )}
                {selectedItem.type === 'Video' && (

                  <>
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Description
                        </Label>
                        <Input id="username" type='text' name='message' onChange={handleInputChange} className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="picture">File</Label>
                        <Input id="picture" type="file" accept="video/*" name='file' onChange={handleFileChange}
                          className="col-span-3" />
                      </div>

                      {preview && (
                        <video
                          controls
                          loop
                          style={{ width: '100%', height: "200px" }}
                        >
                          <source src={preview} />
                        </video>
                      )}
                      {preview && (
                        <>
                          {show_loading ?
                            <Button disabled><Loader2 className="animate-spin" />Please wait</Button>
                            :
                            <Button variant={'outline'} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={short_video}>Generate Shorts</Button>
                          }
                        </>
                      )}


                      <Dialog open={show_short_modal} >

                        <DialogContent className="sm:max-w-[425px] border">
                          <div className='mt-4 border'>
                            <video
                              controls
                              loop
                              style={{ width: '100%', height: "200px" }}
                            >
                              <source src={shorts} />
                            </video>
                          </div>
                          <DialogFooter >
                            <DialogClose asChild>
                              <Button onClick={() => {
                                set_short_modal(false)
                                setpreview(shorts)
                                setform_data((pre) => ({
                                  ...pre,
                                  file: shorts
                                }))
                              }} type="button" variant="secondary">
                                Save
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div>
                      <div >
                        <SheetDescription className='my-4'>
                          (Optional) Set a specific date to trigger this action
                        </SheetDescription>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Duration
                          </Label>
                          <Input id="username" type='date' name='start_date' onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>

                        <SheetDescription className='my-3'>
                          Select the platforms on which you would like to post.
                        </SheetDescription>
                        <div className="flex items-center space-x-2">

                          <div className="flex items-center">
                            <input id="facebook" type="checkbox" checked={selectedPlatforms.facebook} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Facebook</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="instagram" type="checkbox" checked={selectedPlatforms.instagram} onChange={handleCheckboxChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Instagram</label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="flex items-center">
                          <input id="youtube" type="checkbox" value="" checked={selectedPlatforms.youtube} onChange={handleCheckboxChange} className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Youtube</label>
                        </div>


                      </div>

                    </div>

                  </>
                )}
                {selectedItem.type === 'Invoice' && (

                  <>
                    {!sign_in && (
                      <>
                        <div className='my-3 mx-10'>
                          <Button onClick={googlelogin} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Authorize Google Account</Button>
                        </div>
                      </>
                    )}
                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center mx-16 gap-4">
                        <Select
                          onValueChange={(e) => setDocumentType(e)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Document Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Invoice">Invoice</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='flex justify-around'>
                        <Button className='bg-blue-600 hover:bg-blue-500' onClick={() => handleAddField('text')} >Add Text </Button><Button className='bg-blue-600 hover:bg-blue-500' onClick={() => handleAddField('date')} >Add Date</Button><Button className='bg-blue-600 hover:bg-blue-500' onClick={() => handleAddField('number')} >Add Number</Button>
                      </div>

                      <div>
                        {fields.map((field, index) => (
                          <div key={index}>
                            {field.type === 'text' && (
                              <div className="grid grid-cols-4 items-center gap-4 mt-1">
                                <Label htmlFor="username" className="text-right">
                                  Text
                                </Label>
                                <Input type='text' value={field.value}
                                  onChange={(e) => handleFieldChange(e, index)}
                                  placeholder={`Enter ${field.type}`} className="col-span-3" />
                              </div>
                            )}
                            {field.type === 'number' && (
                              <div className="grid grid-cols-4 items-center gap-4 mt-1">
                                <Label htmlFor="username" className="text-right">
                                  Number
                                </Label>
                                <Input type='number' value={field.value}
                                  onChange={(e) => handleFieldChange(e, index)}
                                  placeholder={`Enter ${field.type}`} className="col-span-3" />
                              </div>
                            )}
                            {field.type === 'date' && (
                              <div className="grid grid-cols-4 items-center gap-4 mt-1">
                                <Label htmlFor="username" className="text-right">
                                  Date
                                </Label>
                                <Input type='date' value={field.value}
                                  onChange={(e) => handleFieldChange(e, index)}
                                  placeholder={`Enter ${field.type}`} className="col-span-3" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>


                      <div className='mx-2'>
                      {fields.length > 0 && (
                         <>
                          {
                          show_loading ?
                            <Button  className='w-full px-3' disabled><Loader2 className="animate-spin" />Please wait</Button>
                            :
                            <Button variant={'outline'} className='flex w-full  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={handleSubmit} >Generate PDF</Button>
                        }
                         </>
                      )}
                      </div>

                      <Dialog open={show_short_modal} >

                        <DialogContent className="sm:max-w-[425px] border">
                          <div className='mt-4 border'>
                            {
                              PDFpreview && (
                                <iframe
                                  src={window.URL.createObjectURL(PDFpreview)}
                                  title="PDF Preview"
                                  style={{ border: 'none', width: "100%", height: "300px" }}
                                />
                              )
                            }
                          </div>
                          <DialogFooter >
                            <Button variant="secondary" className='mx-2 flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' onClick={() => {
                              set_short_modal(false);
                              handleDownload();
                            }}  >
                              Download
                            </Button>
                            <Button className='mx-2' onClick={async () => {
                              set_short_modal(false)
                              let b = await convertFileToBase64(PDFpreview);
                              console.log(b);
                              setform_data((pre) => ({
                                ...pre,
                                file: b
                              }))
                            }} type="button" variant="outline">
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <SheetDescription className='my-3'>
                          Select the platforms on which you would like to Save.
                        </SheetDescription>

                      <div className="flex items-center">
                        <input id="google_drive" name='google_drive' type="checkbox" checked={form_data.google_drive} onChange={handleCheckChange} value="" className="w-4 h-4 bg-gray-100  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Google Drive</label>
                      </div>

                    </div>

                  </>
                )}
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" className='flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={saveDetails}>Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </>
        )}
      </>
    )
  };


export default Sheets;