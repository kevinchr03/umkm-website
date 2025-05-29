<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>

    <div class="widgets">
      <div class="widget total-umkm">
        <h2>Total UMKM Registered</h2>
        <p>{{ umkmList.length }}</p>
        <a href="/admin/create" class="btn-add-umkm">Add UMKM</a>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>UMKM Name</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(umkm, index) in umkmList" :key="umkm.id">
            <td>{{ index + 1 }}</td>
            <td>{{ umkm.namaUmkm }}</td>
            <td>{{ umkm.contactId?.namaOwner }}</td>
            <td>{{ umkm.kategoriUmkm }}</td>
            <td>{{ umkm.lokasiId?.alamat }}</td>

            <td class="actions-cell">
              <button class="btn-create-qr" @click="createQRbyId(umkm._id)">Create QR</button>
              <!-- <button class="btn-edit" @click="editUMKM(umkm._id)">Edit</button> -->
              <button class="btn-delete" @click="deleteUMKM(umkm._id, umkm.namaUmkm, token)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const token = localStorage.getItem('token')
if (!token) {
  console.error('No token found. Redirecting to login...')
  router.push('/admin/') // <== Redirect to /admin/
}

const API_URL = import.meta.env.VITE_API_KEY
const umkmList = ref([])
const fetchUmkm = async () => {
  try {
    const response = await axios.get(`${API_URL}/umkm/`)
    umkmList.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const createQRbyId = async (umkmId) => {
  const popup = window.open('', 'qrPopup', 'width=400,height=400,resizable=no,scrollbars=no')

  if (!popup) {
    alert('Popup blocked! Please allow popups for this site.')
    return
  }

  console.log('Calling API with:', `${API_URL}/umkm/generateqr/${umkmId}`);
console.log('Token:', token);

  try {
    const response = await axios.post(
      `${API_URL}/umkm/generateqr/${umkmId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    )

    const qrUrl = response?.data?.data?.qrCodeUrl

    if (qrUrl) {
      // Write minimal HTML content with image and close document stream
      popup.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>QR Code</title>
            <style>
              body {
                margin: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
              }
              img {
                max-width: 100%;
                max-height: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${qrUrl}" alt="QR Code" onerror="document.body.innerHTML='<p>Failed to load QR Code image.</p>'" />
          </body>
        </html>
      `)
      popup.document.close()
    } else {
      popup.document.write('<p>QR code not found in response.</p>')
      popup.document.close()
    }
  } catch (error) {
    console.error('Error generating QR:', error)
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request)
    } else {
      // Something happened setting up the request
      console.error('Request setup error:', error.message)
    }
    popup.document.write('<p>Failed to generate QR code.</p>')
    popup.document.close()
  }
}



const deleteUMKM = async (umkmId, umkmName, token) => {
  const confirmed = confirm(`Are you sure you want to delete ${umkmName}?`);
  if (confirmed) {
    try {
      const response = await axios.delete(
        `${API_URL}/umkm/${umkmId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("UMKM deleted successfully!")
    } catch (e) {
      console.error("Error deleting UMKM:", e);
    }
  }
};

onMounted(() => {
  fetchUmkm()
})
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
  color: #c72a09;
}

.widgets {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.widget {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px 30px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 8px rgba(199, 42, 9, 0.15);
}

.widget h2 {
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.widget p {
  font-size: 48px;
  font-weight: bold;
  color: #c72a09;
  margin: 0;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* ensures horizontal scroll on smaller devices */
}

thead {
  background-color: #c72a09;
  color: white;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

tbody tr:hover {
  background-color: #ffe3e3;
}

.actions-cell {
  display: flex;
  gap: 8px;
  flex-wrap: wrap; /* allow buttons to wrap on small screens */
  justify-content: start;
}

.actions-cell button {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  flex-shrink: 1; /* allow buttons to shrink */
  white-space: nowrap;
  font-size: 14px;
}

/* Create QR button */
.btn-create-qr {
  background-color: #c72a09;
  color: white;
}

.btn-create-qr:hover {
  background-color: #a32607;
}

/* Edit button */
.btn-edit {
  background-color: #1e90ff;
  color: white;
}

.btn-edit:hover {
  background-color: #0c6efd;
}

/* Delete button */
.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #b02a37;
}

.btn-add-umkm {
  display: inline-block;
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-add-umkm:hover {
  background-color: #218838;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .widgets {
    flex-direction: column;
    gap: 15px;
  }

  .widget {
    padding: 15px 20px;
  }

  .widget p {
    font-size: 36px;
  }

  table {
    min-width: 100%; /* remove min width, allow table to shrink */
  }

  th,
  td {
    padding: 10px 8px;
    font-size: 14px;
  }

  .actions-cell button {
    padding: 5px 8px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 12px;
  }

  h1 {
    font-size: 22px;
  }

  .widget p {
    font-size: 28px;
  }

  th,
  td {
    padding: 8px 6px;
    font-size: 12px;
  }

  .actions-cell {
    gap: 5px;
  }

  .actions-cell button {
    padding: 4px 6px;
    font-size: 11px;
  }
}
</style>
