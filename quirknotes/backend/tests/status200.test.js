  test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

  const SERVER_URL = "http://localhost:4000";
  // NOTE: Since tests are not meant to affect each other,
  // all tests were set up to create and delete their own notes.


  test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {  
    const getNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const getNoteBody = await getNoteRes.json();
  
    expect(getNoteRes.status).toBe(200);
    expect(getNoteBody.response.length).toBe(0);
  });

  test("/postNote - Post a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);

  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    let title = "NoteTitleTest1";
    let content = "NoteTitleContent1";
    let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    title = "NoteTitleTest1";
    content = "NoteTitleContent1";
    postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const getNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const getNoteBody = await getNoteRes.json();
  
    expect(getNoteRes.status).toBe(200);
    expect(getNoteBody.response.length).toBe(2);

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`2 note(s) deleted.`);
  });
  
  test("/deleteNote - Delete a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");


    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "new1",
        content: "new2",
      }),
    });
    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with just title", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");


    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "new only title",
      }),
    });
    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");


    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "only content",
      }),
    });
    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe("1 note(s) deleted.");

  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    for (let i = 0; i < 3; i++) {
      const title = "NoteTitleTest";
      const content = "NoteTitleContent";
    
      const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
    
      const postNoteBody = await postNoteRes.json();
    
      expect(postNoteRes.status).toBe(200);
      expect(postNoteBody.response).toBe("Note added succesfully.");
    }

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe("3 note(s) deleted.");

  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const updateNoteRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: "red",
      }),
    });

    const updateNoteBody = await updateNoteRes.json();
    expect(updateNoteRes.status).toBe(200);
    expect(updateNoteBody.message).toBe("Note color updated successfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
  
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe("1 note(s) deleted.");
  });