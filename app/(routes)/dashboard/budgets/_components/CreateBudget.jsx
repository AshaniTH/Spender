"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
// server-side DB access must not be used from a client component
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreateBudget() {

  const [emojiIcon,setEmojiIcon] = useState('😊');
  const [openEmojiPicker,setOpenEmojiPicker] = useState(false);

  const [name,setname] = useState();
  const [amount,setAmount] = useState();
  
  const {user} = useUser();
  const onCreateBudget =async()=>{
    try{
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          amount,
          icon: emojiIcon,
          created_by: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to create budget');
      }

      toast.success('New budget created!');

      // optionally reset form
      setname('');
      setAmount('');
      setEmojiIcon('😊');
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    }
  }

  return (
    <div>
      
        <Dialog>
  <DialogTrigger asChild>
      <div className='bg-green-100 p-10 rounded-md items-center flex flex-col border-2 border-green- border-dashed cursor-pointer hover:shadow-md'>
            <h2 className='text-3xl'>+</h2>
            <h2>Create New Budget</h2>
        </div>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Budget</DialogTitle>
      <DialogDescription>
        <div className='mt-5'>
        <Button className={'border-green-300'} variant="outline"
        onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
        >{emojiIcon}</Button>
        <div className='absolute'>
      <EmojiPicker 
      open = {openEmojiPicker}
      onEmojiClick={(e)=>{setEmojiIcon(e.emoji)
        setOpenEmojiPicker(false)
      }}
      />
    </div>
    <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>
            Budget Name
        </h2>
        <Input onChange={(e) => setname(e.target.value)} className={'border-green-300'} placeholder="e.g. Home Decor"/>
    </div>
    <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>
            Budget Amount
        </h2>
        <Input type="number" onChange={(e) => setAmount(e.target.value)} className={'border-green-300'} placeholder="e.g. Rs:500.00"/>
    </div>
  
    </div>
      </DialogDescription>
    </DialogHeader>
     <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
           <Button disabled={ !(name && amount)} className={'mt-5 w-full'}
  onClick={onCreateBudget}
  >Create Budget</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreateBudget